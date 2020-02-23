'use strict';
// Node imports
var Jimp = require('jimp');
// Own imports
const { queues, connectionPromise} = require('../index');
const { Advert } = require('../../models');
const database = require('../../database');


// Start connection
console.log('STARTING - thumbnails generator worker...')
main().catch(error => console.error('ERROR - Connecting to rabbitmq', error));

// Connect to queue and mongo
async function main() {
    // Mongodb connection
    await database.connect(process.env.MONGODB_URL);
    console.log('OK - Connected to mongodb');
    // Connect to cloud rabbitmq
    const connection = await connectionPromise;
    queues.thumbnails.channel = await connection.createChannel();
    const aux = await queues.thumbnails.channel.assertQueue(queues.thumbnails.name, { durable: true, arguments: { 'x-message-ttl': 3600000 } });
    if (aux) {
        queues.thumbnails.connected = true;
        queues.thumbnails.channel.prefetch(2);
        console.log(`OK - Connected to rabbitmq: ${queues.thumbnails.name}`);
        // Consume channel
        queues.thumbnails.channel.consume(queues.thumbnails.name, msg => {
            const message = JSON.parse(msg.content.toString());
            let thumbnail = message.photo;
            thumbnail = thumbnail.replace('/original/','/thumbnail/');
            Jimp.read(`public${message.photo}`)
            .then(image => {
                // Create thumbnail and update mongo
                image.resize(250, Jimp.AUTO).quality(80).write(`public${thumbnail}`);
                queues.thumbnails.channel.ack(msg);
                Advert.udpateThumbnail(message.id, thumbnail)
                .then (res => console.log(`OK - Advert ${message.id} updated with thumbnail ${thumbnail}`))
                .catch (err => console.error(`ERROR - Updating advert ${err.message}`));
            })
            .catch(error => console.error(error));
        });
    } else {
        console.error(`ERROR - Connecting to rabbitmq: ${queues.thumbnails.name}`);
    }
}