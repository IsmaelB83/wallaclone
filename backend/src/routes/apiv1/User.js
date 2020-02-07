'use strict';
// Node imports
const express = require('express');
const { body } = require('express-validator');
// Own imports
const { MulterMiddleware } = require('../../middlewares')
const { AuthMiddleware } = require('../../middlewares');
const { UserCtrl } = require('../../controllers');

/**
 * Exports arrow function with the USER routes
 */
module.exports = () => {

    const router = express.Router();

    // New user account
    router.post(
        '/',
        [   body('name').isLength({min:1, max: 30}).withMessage('debe estar entre 1 y 30 carácteres'),
            body('email').isLength({min:3, max: 150}).withMessage('debe estar entre 3 y 150 carácteres'),
            body('password').isLength({min:8, max: 16}).withMessage('debe estar entre 8 y 16 carácteres'),
        ], 
        UserCtrl.create
    );

    // Edit user data
    router.put(
        '/',
        AuthMiddleware,
        MulterMiddleware, 
        UserCtrl.edit
    );

    // Add/Remove advert from user favorites
    router.put(
        '/favorites/:slug', 
        AuthMiddleware,
        UserCtrl.setFavorite);

    // Get user's favorites
    router.get(
        '/favorites/', 
        AuthMiddleware,
        UserCtrl.getFavorites);

    // Return routes object
    return router;
}