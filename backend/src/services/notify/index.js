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
const { User, Advert } = require('../../models');
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
appServer.listen(process.env.PORT_NOTIFY, () => {
    console.log(`OK - HTTPS server running on port ${process.env.PORT_NOTIFY}`);
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
            if (message.transaction === 'update' || message.transaction === 'delete') {
                notifyUsersUpdate(message);
            } else {
                notifyUsersCreate(message);
            }
            // Ack queue
            queues.notifications.channel.ack(msg);
        });
    } else {
        console.log(`ERROR - Connecting to rabbitmq: ${queues.notifications.name}`);
    }
}

/**
 * Notify users when a product is updated
 * @param {Object} message Advert data
 */
function notifyUsersUpdate (message) {

    // Build the message
    let notificationBody = undefined;
    let mailBody = undefined;
    const notificationActions = [];    
    if (message.transaction === 'delete') {
        mailBody = 'The product has been deleted and therefore deleted from your favorites.';
        notificationBody = 'The product has been deleted and therefore deleted from your favorites.';
    } else if (message.sold) {
        mailBody = 'The product has been sold. Click in the button below to see details in Wallaclone.';
        notificationBody = 'The product has been sold. Click in the button below to remove it from favorites.';
        notificationActions.push({ action: 'delete', title: 'Delete' });
    } else if (message.booked) {
        mailBody = 'The product is now booked. Click in the button below to see details in Wallaclone.';
        notificationBody = 'The product is now booked. Click in the button below to see details and contact the owner.';
        notificationActions.push({ action: 'detail', title: 'Detail' });
    } else if (parseFloat(message.price) < parseFloat(message.oldPrice)) {
        mailBody = `The product has dropped in price (from ${message.oldPrice} to ${message.price}). Click in the button below to see details in Wallaclone.`;
        notificationBody = `The product has dropped in price (from ${message.oldPrice} to ${message.price}). Click in the button below to see details and contact the owner.`;
        notificationActions.push({ action: 'detail', title: 'Detail' });       
    } else if (parseFloat(message.price) > parseFloat(message.oldPrice)) {
        mailBody = `The product has risen in price (from ${message.oldPrice} to ${message.price}). Click in the button below to see details in Wallaclone.`;
        notificationBody = `The product has risen in price (from ${message.oldPrice} to ${message.price}). Click in the button below to navigate to your favorites.`;
        notificationActions.push({ action: 'detail', title: 'Detail' });       
    }

    // If there is a message to notify only notify to users that have in its favs
    if (notificationBody) {
        User.find({favorites: message._id}).select('_id login name email avatar favorites')
        .then(res => {
            res.forEach(user => {
                // First priority is push notification, if error or no subscribed send email
                const subscription = subscriptions[user.login];
                if (subscription) {
                    try {
                        pushNotification(subscription, message, 'Updated product', notificationBody, notificationActions);                       
                    } catch (error) {
                        mailNotification(user.name, user.email, 'Updated product', message, mailBody);   
                    }
                }
                else {
                    mailNotification(user.name, user.email, 'Updated product', message, mailBody);
                }
            })
        })
        .catch(err => console.log(err));
    }
}

/**
 * Notify a new product
 * @param {Object} message Advert data created
 */
function notifyUsersCreate (message) {

    // Build the message
    const mailBody = `New product that may be of your interest created recently. ${message.name} with a selling price of ${message.price}. Click the button to see it in Wallaclone.`;
    const notificationBody = `${message.name}' has been published with a selling price of ${message.price}'. Click the button below to add it to your favorites.`;
    const notificationActions = [{ action: 'add', title: 'Add' }];

    // Notification only applies with new selling adverts
    if (message.type !== 'sell') {
        return;
    }

    // Search all products with same description and price +/- 10%
    const lowRange = parseFloat(message.price) * 0.9;
    const highRange = parseFloat(message.price) * 1.1;
    const lowerName = message.name.toLowerCase();
    Advert.find({
        _id: { '$ne': message._id},
        name: {'$regex': lowerName, $options:'i'},
        type: 'buy',
        price: {$gt: lowRange, $lt: highRange}
    })
    .select('_id name slug thumbnail price')
    .populate('user', '_id login name email avatar')
    .then(res => {
        res.forEach(advert => {
            // First priority is push notification
            const subscription = subscriptions[advert.user.login];
            if (subscription) {
                try {
                    pushNotification(subscription, message, 'New product for you', notificationBody, notificationActions);                       
                } catch (error) {
                    mailNotification(advert.user.name, advert.user.email, 'New product for you', message, mailBody);   
                }
            }
            else {
                mailNotification(advert.user.name, advert.user.email, 'New product for you', message, mailBody);
            } 
        })
    })
    .catch(err => console.log(err));
}

/**
 * Send a notification via push notification
 * @param {Object} subscription Subscription to send the notification
 * @param {Object} message Message object with advert data
 * @param {String} title Notification title
 * @param {String} body Notification body
 * @param {String} actions Array with the actions
 */
function pushNotification(subscription, message, title, body, actions) {
    webpush.sendNotification(subscription, JSON.stringify({
        slug: message.slug, 
        title,
        body,
        icon: `${process.env.BACKEND_URL}${message.thumbnail}`,
        image: `${process.env.BACKEND_URL}${message.thumbnail}`,
        actions
    }))
}

/**
 * Send a notification via email
 * @param {String} name User name
 * @param {String} email User email
 * @param {String} subject User subject
 * @param {Object} message Message object with advert data
 * @param {String} body Text to include it in the email body
 */
function mailNotification(name, email, subject, message, body) {
    mail({
        name,
        email, 
        subject,
        message,
        body,
        url: `${process.env.FRONTEND_URL}/advert/${message.slug}`,
        view: message.transaction==='create'?'product_new':'product_update',
        thumbnail: message.thumbnail
    });
}