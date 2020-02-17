'use strict';
// Node imports
const amqplib = require('amqplib');
// Load .env file
require('dotenv').config();

// Queues are managed in https://www.cloudamqp.com
const queues = {}
queues.thumbnails = { name: 'thumbnails',    connected: false, channel: null }
queues.notifications = { name: 'notifications', connected: false, channel: null }

// Connect to rabbitmq (it returns a promise)
const connectionPromise = amqplib.connect(process.env.RABBITMQ_URL);

module.exports = {
    queues,
    connectionPromise
}