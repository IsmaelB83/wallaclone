'use strict';
// Node imports
const express = require('express');
const { query, param } = require('express-validator');
// Own imports
const { WebAdvertCtrl } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');


module.exports = () => {

    // Create express router
    const router = express.Router();

    /**
     * Render home page
     */
    router.get(
        '/', 
        [   query('name').optional().isLength({min:1, max: 30}).withMessage('value must be between 1 and 30 characteres length'),
            query('price').optional().custom(value => {
                let aux = value.split('-');
                let result = true;
                for (let i = 0; i < aux.length; i++) {
                    if (aux[i] && isNaN(+aux[i])) {
                        result = false;
                    }
                }
                return result;
            }).withMessage('must be numeric'),
            query('skip').optional().isInt({ gt: 0 }).withMessage('must be a number greater than 0'),
            query('limit').optional().isInt({ gt: 0 }).withMessage('must be a number greater than 0')
        ],
        AuthMiddleware, 
        WebAdvertCtrl.index); 
    /**
     * Render advert detail
     */
    router.get(
        '/advert/:id', 
        [   param('id').matches(/^[0-9a-fA-F]{24}$/).withMessage('wrong format'),
        ], 
        AuthMiddleware, 
        WebAdvertCtrl.detail);
    
    // Return router
    return router;
}