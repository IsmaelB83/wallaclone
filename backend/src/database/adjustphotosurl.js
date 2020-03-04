'use strict';
// Node imports
const fs = require('fs');
// Own imports
const database = require('./index');
const { Advert } = require('../models');

// Load env variables
require('dotenv').config();

// Connect to MongoDB
database.connect(process.env.MONGODB_URL)
.then(async (conn) => {
    Advert.find()
    .then(products => {
        products.forEach(prod => {
          const photo = prod.photo.replace('/images/adverts/', '/images/products/');
          const thumbnail = prod.photo.replace('/images/adverts/', '/images/products/');
          Advert.updateOne({_id: prod._id}, {photo, thumbnail})
          .then (res => console.log(res));
        });
    });
    console.log('Updated all');
})
.catch(error => {
    // Error no controlado
    console.error('Uncontrolled error.');
    console.error(error);
});