'use strict';
// Node imports
const fs = require('fs');
// Own imports
const database = require('./index');
const { Advert, User } = require('../models');

// Load env variables
require('dotenv').config();

// Connect to MongoDB
database.connect(process.env.MONGODB_URL)
.then(async (conn) => {
    // Borro los datos de la colección de anuncion
    await Advert.deleteAll();
    await User.deleteAll();
    // Read JSON init data
    const dump = JSON.parse(fs.readFileSync('./src/database/data.json', 'utf8'));
    // Create default user
    for (let i = 0; i < dump.users.length; i++) {
        let user = new User(dump.users[i]);
        user = await User.insert(user);
        user.active = true;
        user.token = null;
        user.expire = null;
        await user.save();
    }
    // Create default adverts
    const adverts = [];
    for (let i = 0; i < dump.anuncios.length; i++) {
        const advert = new Advert({...dump.anuncios[i]});
        advert.thumbnail = advert.photo; // Default thumbnail is the original photo
        adverts.push (advert);
    }
    await Advert.insertAll(adverts);
    // Create default user
    console.log(`Database created with ${adverts.length} adverts and ${dump.users.length} users.`);
    console.log('Please start nodepop with "npm start"');
})
.catch(error => {
    // Error no controlado
    console.log('Uncontrolled error.');
    console.log(error);
});