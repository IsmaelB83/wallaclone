'use strict';
// Node imports
const express = require('express');
// Own imports
const { AuthMiddleware } = require('../../middlewares');
const { ChatCtrl } = require('../../controllers');

/**
 * Exports arrow function with the USER routes
 */
module.exports = () => {

    const router = express.Router();

    // Creates a chat for the specified advert slug
    router.post(
        '/:slug',
        AuthMiddleware,
        ChatCtrl.create
    );

    // Get opened chats
    router.get(
        '/', 
        AuthMiddleware,
        ChatCtrl.list);

    // Return routes object
    return router;
}