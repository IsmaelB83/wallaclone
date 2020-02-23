'use strict';
// Node imports
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
// Own imports
const { AuthRoutes, UserRoutes, AdvertRoutes, ChatRouter } = require('./routes');
const { ErrorMiddleware, AuthMiddleware } = require('./middlewares');
const { i18nConfig } = require('./utils');
const database = require('./database');


// App express
const app = express();

// Connect to MongoDB
database.connect(process.env.MONGODB_URL)
.then(conn => {
        // View engine settings (ejs)
        app.set('views', path.join(__dirname, './views'));
        app.set('trust proxy', 1)
        app.set('view engine', 'ejs');
        // Static files
        app.use(express.static('public'));
        // Middlewares
        app.use(cors());
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(i18nConfig().init);
        // Routes API version
        app.use('/apiv1/user', UserRoutes());
        app.use('/apiv1/chats', ChatRouter());
        app.use('/apiv1/adverts', AdvertRoutes());
        app.use('/apiv1/authenticate', AuthRoutes());
        app.get('/favicon.ico', (req, res) => res.status(204));
        app.use(AuthMiddleware, (req, res, next) => next({status: 404, description: 'Not found'}));
        // error handler
        app.use(ErrorMiddleware);
})
.catch( error => {
    console.error('Error connecting mongodb');
    console.error(error);
});

module.exports = app;