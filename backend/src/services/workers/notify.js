'use strict';
// Node imports
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
// Own imports
const { queues, connectionPromise} = require('../index');
const { User } = require('../../models');
const database = require('../../database');
const { mail } = require('../../utils');

// Start express server (handle push registrations)
console.log('Configuring Express...')
const app = express();
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
webpush.setVapidDetails('mailto:ismaelbernal83@gmail.com', process.env.VAPID_KEY_PUBLIC, process.env.VAPID_KEY_PRIVATE);
app.listen(process.env.PUSH_NOTIFICATION_SERVER_PORT, () => {
    console.log(`Express started on port ${process.env.PUSH_NOTIFICATION_SERVER_PORT}`);
});

// Start mongodb connection
console.log('Connecting to mongodb...')
database.connect(process.env.MONGODB_URL)
.then (res => {
    // Ok
    console.log('Mongodb connected')
    // Start connection to rabbit queues
    console.log('Connecting to rabbitmq...')
    main().catch(error => console.log('ERROR - Connecting to rabbitmq', error));
})
.catch (err => console.log('ERROR connecting to mongodb', err));



// Subscribe route for clients
app.post('/subscribe', (req, res) => {
    // Get push subscription object
    const subscription = req.body;
    // Send 201 status - resource created
    res.status(201).json({});   
    // Create payload
    const payload = JSON.stringify({ title: 'Push test' });
    // Pass object into the sendNotification
    webpush.sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

// Connect to queue and mongo
async function main() {
    // Connect to cloud rabbitmq
    const connection = await connectionPromise;
    queues.notifications.channel = await connection.createChannel();
    const aux = await queues.notifications.channel.assertQueue(queues.notifications.name, { durable: true, arguments: { 'x-message-ttl': 3600000 } });
    if (aux) {
        queues.notifications.connected = true;
        queues.notifications.channel.prefetch(2);
        console.log(`Rabbitmq connected: ${queues.notifications.name}`);
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