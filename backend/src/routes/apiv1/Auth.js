'use strict';
// Node imports
const express = require('express');
const { body } = require('express-validator');
// Own imports
const { AuthMiddleware } = require('../../middlewares');
const { AuthCtrl } = require('../../controllers');

/**
 * Exports arrow function with the USER routes
 */
module.exports = () => {

    const router = express.Router();

    // Login with username/password. It returns the JWT
    router.post(
        '/',
        [   body('login').isLength({min:1, max: 15}).withMessage('debe estar entre 1 y 15 carácteres'),
            body('password').isLength({min:8, max: 16}).withMessage('debe estar entre 8 y 16 carácteres'),
        ], 
        AuthCtrl.login
    );
    // Validates the JWT a user has. Used by frontend to validate the JWT in case it was in LS from previous sessions
    router.post(
        '/token',
        AuthMiddleware,
        AuthCtrl.loginToken
    );
    // Logout (requires to be authenticated first). It invalidates the current JWT
    router.post(
        '/logout',
        AuthMiddleware,
        AuthCtrl.logout
    );
    // Activate user account
    router.get(
        '/activate/:token',
        AuthCtrl.activate
    );
    // Request reset password
    router.post(
        '/reset/',
        AuthCtrl.requestReset
    );
    // Reset password
    router.post(
        '/reset/:token',
        AuthCtrl.reset
    );
    
    // Return routes object
    return router;
}