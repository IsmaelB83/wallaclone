'use strict';
// Node imports
const express = require('express');
const { body } = require('express-validator');
// Own imports
const { AuthCtrl } = require('../../controllers');

/**
 * Exports arrow function with the USER routes
 */
module.exports = () => {

    const router = express.Router();

    // Login with username/password. It returns the JWT
    router.post(
        '/',
        [   body('email').isLength({min:3, max: 150}).withMessage('debe estar entre 3 y 150 carácteres'),
            body('password').isLength({min:8, max: 16}).withMessage('debe estar entre 8 y 16 carácteres'),
        ], 
        AuthCtrl.login
    );
    
    // Return routes object
    return router;
}