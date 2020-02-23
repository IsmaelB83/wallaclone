'use strict';
// Node imports
const fs = require('fs');
// Own imports
const database = require('./index');
const { Advert, User, Chat } = require('../models');

// Load env variables
require('dotenv').config();

// Connect to MongoDB
database.connect(process.env.MONGODB_URL)
.then(async (conn) => {
    // Borro los datos de la colección de anuncion
    await Advert.deleteAll();
    await User.deleteAll();
    await Chat.deleteAll();
    // Read JSON init data
    const dump = JSON.parse(fs.readFileSync('./src/database/data.json', 'utf8'));
    // Create default user
    let users = [];
    for (let i = 0; i < dump.users.length; i++) {
        let user = new User(dump.users[i]);
        user = await User.insert(user);
        user.active = true;
        user.token = null;
        user.expire = null;
        user = await user.save();
        users.push(user);
    }
    // Create default adverts
    let adverts = [];
    for (let i = 0; i < dump.anuncios.length; i++) {
        const advert = new Advert({...dump.anuncios[i]});
        advert.user = users[Math.floor(Math.random()*users.length)]._id;
        advert.thumbnail = advert.photo; // Default thumbnail is the original photo
        adverts.push (advert);
    }
    adverts = await Advert.insertAll(adverts)
    // Create default chats
    let chats = []; 
    for (let i = 0; i < dump.chats.length; i++) {
        const chat = new Chat();
        chat.advert = adverts[i]._id;
        chat.users.push(users[0]._id);
        chat.users.push(users[1]._id);
        for (let j = 0; j < dump.chats[i].messages.length; j++) {
            const mess = dump.chats[i].messages[j];
            chat.messages.push({
                user: users[mess.user]._id,
                date: mess.date,
                text: mess.text
            });
        }
        chats.push(chat);
    }
    chats = await Chat.insertAll(chats);
    // Log
    console.log(`Database created with ${adverts.length} adverts, ${dump.users.length} users and ${dump.chats.length} chats.`);
    console.log('Please start nodepop with "npm start"');
})
.catch(error => {
    // Error no controlado
    console.error('Uncontrolled error.');
    console.error(error);
});