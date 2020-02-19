'use strict';
// Node imports
// Own imports
const { queues, connectionPromise} = require('../index');

// Start connection
console.log('STARTING - senders rabbitmq...')
main().catch(error => console.log('ERROR - Connecting to rabbitmq', error));

// Connect to queues
async function main() {
    // Connect to every queue
    for (const key in queues) {
        if (queues.hasOwnProperty(key)) {
            const queue = queues[key];
            const connection = await connectionPromise;
            queue.channel = await connection.createChannel();
            const aux = await queue.channel.assertQueue(queue.name, { durable: true, arguments: { 'x-message-ttl': 3600000 } });
            if (aux) {
                queue.connected = true;
                console.log(`OK - Connected to rabbitmq: ${queue.name}`);
            } else {
                console.log(`ERROR - Connecting to rabbitmq: ${queue.name}`);
            }
        }
    }
}

// Generate a work in notifications pool, so that the worker is able to generate the thumbnail
const handleThumbnail = (photo, id) => {
    // Check connection
    if (!queues.thumbnails.connected) {
        console.log(`ERROR - Connection not established to ${queues.thumbnails.name}. Thumbnail message ${photo} lost.`);
        return;
    }
    // Information required by the worker to prepare the thumbnail and update mongodb
    const message = {
        id: id,
        photo: photo,
    };
    // Send work to queue
    queues.thumbnails.channel.sendToQueue(
        queues.thumbnails.name, 
        Buffer.from(JSON.stringify(message)), 
        { persistent: true }
    );
    console.log(`OK - Work to create ${photo} thumbnail sent to queue ${queues.thumbnails.name}`);
}

// Generate a work in notifications pool so that the worker is able to analyze the required notifications
const handleNotifications = (advert, transaction = 'update') => {
    // Check connection
    if (!queues.notifications.connected) {
        console.log(`ERROR - Connection not established to ${queues.notifications.name}. Notifications for advert ${advert.slug} lost.`);
        return;
    }
    // Information required by the worker to check for notifications to be pushed
    debugger;
    const message = {
        _id: advert._id,
        type: advert.type,
        name: advert.name,
        slug: advert.slug,
        thumbnail: advert.thumbnail,
        booked: advert.booked,
        sold: advert.sold,
        price: advert.price,
        oldPrice: advert.price,
        user: advert.user,
        transaction
    }
    // Send work to queue
    queues.notifications.channel.sendToQueue(
        queues.notifications.name,
        Buffer.from(JSON.stringify(message)), 
        { persistent: true }
    );
    console.log(`OK - Work to create notifications ${advert.slug} sent to queue ${queues.notifications.name}`);
}


// Exports functions
module.exports = {
    handleThumbnail,
    handleNotifications
}