'use strict';
// Node imports
const express = require('express');
const https = require('https');
const fs = require('fs');
const cluster = require('cluster');
// Own imports
const database = require('./database');
const server = require('./server');

// Load env variables
require('dotenv').config();

if (cluster.isMaster) {
    // cada vez que arranque un fork
    cluster.on('listening', (worker, address) => {
        console.log(`Worker ${worker.id} con pid ${worker.process.pid} is now connected to port ${address.port}`);
        // si quiero recibir mensajes de los workers
        //worker.on('message', (message) => { }); 
    }); 
    // cada vez que un fork se caiga
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} exited with error code ${code} and signal ${signal}`);
        console.log('Starting a new worker...');
        cluster.fork();
    });
    // arranco tantos procesos como nucleos tenga mi equipo
    const numCPUs = require('os').cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    // Connect to MongoDB
    database.connectToMongo(process.env.MONGODB_URL)
    .then(conn => {
        // Create server application and start server
        const app = server(express(), conn);
        // Prepare https credentials
        const credentials = {
            key: fs.readFileSync(process.env.HTTPS_KEY, 'utf8'),
            cert: fs.readFileSync(process.env.HTTPS_CERT, 'utf8')
        };
        // Start https server
        const appServer = https.createServer(credentials, app);
        appServer.listen(process.env.PORT, () => {
            console.log(`OK - HTTPS server running on port ${process.env.PORT}`);
        });
    })
    .catch( error => {
        console.log('Error connecting mongodb');
        console.log(error);
    });
}