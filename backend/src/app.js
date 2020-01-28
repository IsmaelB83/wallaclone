'use strict';
// Node imports
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const mongoStore = require('connect-mongo')(session);  // persist web session in mongodb
// Own imports
const { AuthRoutes, UserRoutes, AdvertRoutes, WebUserRoutes, WebAdvertRoutes } = require('./routes');
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
        app.use(cookieParser());
        app.use(i18nConfig().init);
        app.use(session({
            name: 'nodeapi-session',
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: { 
                secure: true, // only send trough https
                maxAge: 1000 * 3600 * 24 * 2 // expire time is 2 days
            },
            store: new mongoStore({
                mongooseConnection: conn
            })
        }));
        // Routes web version
        app.use('/', WebAdvertRoutes());
        app.use('/user', WebUserRoutes());
        // Routes API version
        app.use('/apiv1/user', UserRoutes());
        app.use('/apiv1/adverts', AdvertRoutes());
        app.use('/apiv1/authenticate', AuthRoutes());
        app.get('/favicon.ico', (req, res) => res.status(204));
        app.use(AuthMiddleware, (req, res, next) => next({status: 404, description: 'Not found'}));
        // error handler
        app.use(ErrorMiddleware);
})
.catch( error => {
    console.log('Error connecting mongodb');
    console.log(error);
});

module.exports = app;