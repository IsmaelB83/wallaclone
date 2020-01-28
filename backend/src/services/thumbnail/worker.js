'use strict';
// Node imports
var Jimp = require('jimp');
// Own imports
const connectionPromise = require('../connect');
const { Advert } = require('../../models');
const database = require('../../database');


// Queue name in rabbitmq
const queueName = 'thumbnails';

// Connect to amqp
main().catch(error => console.log('Error while connecting to rabbitmq', error));

/**
 * Async function to connect to amqp
 */
async function main() {
    // Mongodb connection
    await database.connect(process.env.MONGODB_URL);
    console.log('Connected to mongodb...')
    // Connect to cloud rabbitmq
    const connection = await connectionPromise;
    // Connect to channel
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, {durable: true});
    channel.prefetch(2);
    console.log('Subscribed to queue...');
    // Consume channel
    channel.consume(queueName, msg => {
        const message = JSON.parse(msg.content.toString());
        console.log(message);
        // Thumbnail name
        let thumbnail = message.photo;
        thumbnail = thumbnail.replace('/original/','/thumbnail/');
        // Resize
        Jimp.read(`public${message.photo}`)
        .then(image => {
            // Create thumbnail
            image.resize(100, 100).quality(60).write(`public${thumbnail}`);
            console.log(`Thumbnail generated: ${thumbnail}`);
            channel.ack(msg);
            // Update advert
            Advert.updateAdvert(message.id, new Advert({thumbnail: thumbnail}))
            .then (result => {
                console.log(`Advert ${result._id} updated: ${result.thumbnail}`);
            });
        })
        .catch(error => {
            console.error(error);
        });
    });
}