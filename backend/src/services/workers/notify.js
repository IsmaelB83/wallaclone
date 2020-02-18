'use strict';
// Node imports
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
// Own imports
const { queues, connectionPromise} = require('../index');
const { User } = require('../../models');
const database = require('../../database');
const { mail } = require('../../utils');

// Load env variables
require('dotenv').config();

// Prepare https credentials
const credentials = {
    key: fs.readFileSync(process.env.HTTPS_KEY, 'utf8'),
    cert: fs.readFileSync(process.env.HTTPS_CERT, 'utf8')
};


// Start express server (handle push registrations)
console.log('Configuring Express...')
const app = express();
app.use(express.static(path.join(__dirname, 'client_demo')));
app.use(bodyParser.json());
app.use(cors())
webpush.setVapidDetails('mailto:ismaelbernal83@gmail.com', process.env.VAPID_KEY_PUBLIC, process.env.VAPID_KEY_PRIVATE);
const appServer = https.createServer(credentials, app);
appServer.listen(process.env.PUSH_NOTIFICATION_SERVER_PORT, () => {
    console.log(`OK - HTTPS server running on port ${process.env.PUSH_NOTIFICATION_SERVER_PORT}`);
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

// Object to handle current subscripcions
const subscriptions = {}

// Subscribe route for clients
app.post('/subscribe/:login', (req, res) => {
    // Store subscription
    const subscription = req.body;
    const login = req.params.login;
    subscriptions[login] = subscription;
    console.log(`Subscriber added: ${login}`);
    // Return OK
    res.status(201).json({data: { success: true, description: 'Push subscription stablished in notify microservice'}});
});

// Unsubscribe route for clients
app.post('/unsubscribe/:login', (req, res) => {
    // Store subscription
    const login = req.params.login;
    delete subscriptions[login];
    console.log(`Subscriber deleted: ${login}`);
    // Return OK
    res.status(201).json({data: { success: true, description: 'Push subscription deleted in notify microservice'}});
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
            // Busco usuarios que lo tienen en favoritos, y por cada uno de ellos llamo a notifyUser
            User.find({favorites: message._id }).select('_id login name email avatar')
            .then(res => res.forEach(user => notifyUser(user, message)))
            .catch(err => console.log(err));
            // Ack queue
            queues.notifications.channel.ack(msg);
        });
    } else {
        console.log(`ERROR - Connecting to rabbitmq: ${queues.notifications.name}`);
    }
}

// This function decides either to push a notification (subscribers) or send an email
async function notifyUser (user, message) {

    // Content of the notification both for mails and push notifications
    let notify = undefined;
    // For push notifications
    const actions = [];    
    // Build message and actions 
    if (message.deleted) {
        notify = 'The product has been deleted. Click in the button below to remove it from favorites.'
        actions.push({ action: 'delete', title: 'Delete' });
    } else if (message.sold) {
        notify = 'The product has been sold. Click in the button below to remove it from favorites.'
        actions.push({ action: 'delete', title: 'Delete' });
    } else if (message.booked === true) {
        notify = 'The product is now booked. Click in the button below to see details and contact the owner.'
        actions.push({ action: 'detail', title: 'Detail' });
    } else if (parseFloat(message.price) < parseFloat(message.oldPrice)) {
        notify = `The product has dropped in price (from ${message.oldPrice} to ${message.price}). Click in the button below to see details and contact the owner.`
        actions.push({ action: 'detail', title: 'Detail' });       
    } else if (parseFloat(message.price) > parseFloat(message.oldPrice)) {
        notify = `The product has risen in price (from ${message.oldPrice} to ${message.price}). Click in the button below to navigate to your favorites.`
        actions.push({ action: 'favorites', title: 'Favorites' });
    }
    
    // If there is a message to notify
    if (notify) {
        // First priority is push notification (as per specs)
        const subscription = subscriptions[user.login];
        let errorSubscription = false;
        if (subscription) {
            // Try notification (in case of error send email)
            const payload = JSON.stringify({
                slug: message.slug, 
                title: 'One of your favorites updated',
                body: notify,
                icon: `${process.env.BACKEND_URL}${message.thumbnail}`,
                image: `${process.env.BACKEND_URL}${message.thumbnail}`,
                actions: actions
            });
            webpush.sendNotification(subscription, payload)
            .catch(err => {
                console.log(err);
                errorSubscription = true;
            });
        } 
        // Without subscription or in case error while pushing notification --> then sends email
        if (!subscription || errorSubscription) {
            mail({
                name: user.name,
                email: user.email, 
                subject: 'Product update',
                message: message,
                notify: notify,
                url: `${process.env.FRONTEND_URL}/advert/${message.slug}`,
                view: 'product_update',
                thumbnail: message.thumbnail
            });
        }
    }
}