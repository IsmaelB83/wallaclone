'use strict';
// Node imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https')
const socketServer = require('socket.io');
const fs = require('fs');
// Own imports
const { Chat, User } = require('../../models');
const database = require('../../database');

// Load env variables
require('dotenv').config();

// Prepare https credentials
const credentials = {
    key: fs.readFileSync(process.env.HTTPS_KEY, 'utf8'),
    cert: fs.readFileSync(process.env.HTTPS_CERT, 'utf8')
};

// Start express server with socket io to handle real time chat
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors());
const appServer = https.createServer(credentials, app);
const io = socketServer(appServer);
appServer.listen(process.env.PORT_CHAT, () => {
    console.log(`OK - HTTPS chat server running on port ${process.env.PORT_CHAT}`);
});

// Connect to mongo
database.connect(process.env.MONGODB_URL)
.then(result => {

    // Variables
    const onlineUsers = [];

    // Client connected to socket.id
    io.on('connection', socket => {

        // DEVELOPMENT logging
        if (process.env.NODE_ENV !== 'production') {
            console.log(`Connected to Socket! ${socket.id}`);
            socket.on('disconnect', () => console.log(`Disconnected socket ${socket.id}`));
        }

        // Online user
        socket.on('online_user', login => {
            const i = onlineUsers.findIndex(user => user.login === login)
            if (i<0) onlineUsers.push({login, socket});
            else onlineUsers[i].socket = socket;
            socket.broadcast.emit('new_online', login); // broadcast except sender
            socket.emit('all_online', onlineUsers.map((user,index)=>user.login));  // only to sender
            console.log(`online ${login}`);
        });

        // Offline user
        socket.on('offline_user', login => {
            const i = onlineUsers.findIndex(user => user.login === login)
            if (i>=0) onlineUsers.splice(i,1);
            socket.broadcast.emit('new_offline', login);  // broadcast except sender
            console.log(`offline ${login}`);    
        });

        // User has read a chat and wants to send confirmation to peer
        socket.on('chat_read', function(data) {
            // Emit message to receiver
            const i = onlineUsers.findIndex(user => user.login === data.user)
            if (i >= 0) {
                const aux = onlineUsers[i].socket;
                aux.emit('messages_confirmed', data);
            }
        });
        
        // Message
        socket.on('message', function(data) {
            // Save in mongo
            const message = {
                date: data.date,
                user: data.senderId,
                text: data.text,
            }
            Chat.findOneAndUpdate({_id: data.chatId}, {$push: { messages: message }})
            .then(chat =>{
                // Emit message to receiver
                const i = onlineUsers.findIndex(user => user.login === data.receiverLogin)
                if (i >= 0) {
                    const aux = onlineUsers[i].socket;
                    aux.emit('message_received', data);
                }
                // Confirm sent to emisor
                socket.emit('message_sent', data);
            })
        });
    });
});