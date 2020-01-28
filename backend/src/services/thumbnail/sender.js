'use strict';
// Node imports
// Own imports
const connectionPromise = require('../connect');

// Queue name in rabbitmq
const queueName = 'thumbnails';
let connected = false;
let channel = null;

/**
 * Connect to amqp
 */
main().catch(error => console.log('Error while connecting to rabbitmq', error));
async function main() {
    // Connect to cloud rabbitmq
    const connection = await connectionPromise;
    // Connect to channel
    channel = await connection.createChannel();
    // Check queue exists
    await channel.assertQueue(queueName, {
        durable: true
    });
    connected = true;
}


module.exports = (photo, id) => {
    if (connected) {
        // Information required by the worker to prepare the thumbnail and update mongodb
        const message = {
            id: id,
            photo: photo,
        };
        // Send work to queue
        channel.sendToQueue(
            queueName, 
            Buffer.from(JSON.stringify(message)), 
            { persistent: true }
        );
        console.log(`Work to create ${photo} thumbnail sent to queue`);
    } else {
        console.log('Error: connection to RabbitMQ not started');
    }
}