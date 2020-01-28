'use strict';
// Node imports
const express = require('express');
// Own imports
const { WebUserCtrl } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');


module.exports = () => {

    // Create express router
    const router = express.Router();
    
    /**
     * Change language of the webapp
     */
    router.get(
        '/change-locale/:locale', 
        AuthMiddleware, 
        WebUserCtrl.changeLocale);
    /**
     * Logout session
     */
    router.get(
        '/logout', 
        AuthMiddleware,
        WebUserCtrl.logout
    );
    /**
     * Render login form
     */
    router.get(
        '/login', 
        WebUserCtrl.formLogin
    );
    /**
     * Login session
     */
    router.post(
        '/login', 
        WebUserCtrl.postLogin
    );
    /**
     * Activate account
     */
    router.get(
        '/activate/:token', 
        WebUserCtrl.activate
    );
    /**
     * Create account
     */
    router.get(
        '/create', 
        WebUserCtrl.formCreate
    );
    /**
     * Create account
     */
    router.post(
        '/create', 
        WebUserCtrl.postCreate
    );
    
    // Return router
    return router;
}