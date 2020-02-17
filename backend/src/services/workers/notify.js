'use strict';
// Own imports
const { queues, connectionPromise} = require('../index');
const { User } = require('../../models');
const database = require('../../database');
const { mail } = require('../../utils');



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
            // Busco usuarios que lo tienen en favoritos
            User.find({favorites: message._id }).select('_id login name email avatar')
            .then(res => {
                // Send mails
                res.forEach(user => {
                    mail({
                        name: user.name,
                        email: user.email, 
                        subject: 'Product update',
                        message: message,
                        url: `http://localhost:3000/advert/${message.slug}`,
                        view: 'product_update',
                        thumbnail: message.thumbnail
                    });
                });
            })
            .catch(err => {
                console.log(err);
            });

            // Ack queue
            queues.notifications.channel.ack(msg);
        });
    } else {
        console.log(`ERROR - Connecting to rabbitmq: ${queues.notifications.name}`);
    }
}