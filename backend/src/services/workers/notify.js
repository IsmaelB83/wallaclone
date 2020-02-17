'use strict';
// Node imports
var Jimp = require('jimp');
// Own imports
const { queues, connectionPromise} = require('../index');
const { Advert } = require('../../models');
const database = require('../../database');


// Start connection
console.log('STARTING - notifications generator worker...')
main().catch(error => console.log('ERROR - Connecting to rabbitmq', error));

// Connect to queue and mongo
async function main() {
    // Mongodb connection
    await database.connect(process.env.MONGODB_URL);
    console.log('OK - Connected to mongodb');
    // Connect to cloud rabbitmq
    const connection = await connectionPromise;
    queues.notifications.channel = await connection.createChannel();
    const aux = await queues.notifications.channel.assertQueue(queues.notifications.name, { durable: true, arguments: { 'x-message-ttl': 3600000 } });
    if (aux) {
        queues.notifications.connected = true;
        queues.notifications.channel.prefetch(2);
        console.log(`OK - Connected to rabbitmq: ${queues.notifications.name}`);
        // Consume channel
        queues.notifications.channel.consume(queues.notifications.name, msg => {
            const message = JSON.parse(msg.content.toString());
            const advert = new Advert(message);
            // Do something
            console.log(message);
            // AcK queue
            queues.notifications.channel.ack(msg);
        });
    } else {
        console.log(`ERROR - Connecting to rabbitmq: ${queues.notifications.name}`);
    }
}