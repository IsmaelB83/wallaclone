'use strict';
// Node imports
require('dotenv').config();
const io = require('socket.io').listen(process.env.PORT_CHAT).sockets;
// Own imports
const { Chat } = require('../../models');
const database = require('../../database');

// Variables
const online = [];
const chats = {};
const sockets = {};

// Connect to mongo
database.connect(process.env.MONGODB_URL)
.then(result => {
    
    // Connected
    console.log('Connected to mongodb...');
    console.log(`Chat server listening on ${process.env.PORT_CHAT}...`);  
   
    // Client connected to socket.id
    io.on('connection', socket => {

        // Online user
        socket.on('online', login => {
            const i = online.indexOf(login);
            if (i<0) online.push(login);
            io.emit('online', login);
            console.log(`online ${login}`);
        });

        // Offline user
        socket.on('offline', login => {
            const i = online.indexOf(login);
            if (i>=0) online.splice(i,1);
            io.emit('offline', login);
            console.log(`offline ${login}`);    
        });

        // Join room
        socket.on('join_chat', function(data) {
            // Gestión de la sala de chat
            const chat = chats[data.chatId];
            if (chat) {
                // Añado el usuario al chat si ya existe
                const j = chats[data.chatId].users.findIndex(u => u.userId === data.userId);
                if (j<0) {
                    chats[data.chatId].users.push({
                        socketId: socket.id,
                        userId: data.userId
                    });
                }
            } else {
                // asigno el chat al array de chats
                chats[data.chatId] = {
                    chatId: data.chatId,
                    users: [{
                        socketId: socket.id,
                        userId: data.userId
                    }]
                };
            }
            // Conecto el socket al canal
            socket.join(data.chatId);
            sockets[socket.id] = {chatId: data.chatId, name: data.userId}
            socket.broadcast.to(data.chatId).emit('status', `${data.userId} joinned chat`);
            console.log(sockets);            
        });
                
        // Leave room
        socket.on('leave_chat', function(data) {
            const chat = chats[data.chatId];
            if (chat) {
                const i = chat.users.findIndex(u => u.userId === data.userId);
                if (i >= 0) {
                    chat.users.splice(i,1);
                    socket.broadcast.to(data.chatId).emit('status', `${data.userId} left chat`);
                    socket.leave(data.chatId);
                    delete sockets[socket.id];
                }
            } 
            console.log(sockets);            
        });

        // Typing
        socket.on('typing', function(data) {
            const aux = sockets[socket.id];
            socket.broadcast.to(aux.chatId).emit('status', `${aux.name} is typing...`);
        });

        // Not typing
        socket.on('not_typing', function() {
            const aux = sockets[socket.id];
            socket.broadcast.to(aux.chatId).emit('status', '');
        });
        
        // Message
        socket.on('message', function(data) {
            const aux = sockets[socket.id];
            socket.broadcast.to(aux.chatId).emit('message', `${aux.name}: ${data}`);
            console.log(sockets);                        
        });

        setInterval(()=>{
            console.log(online)
        },2000);
    });
});