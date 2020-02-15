'use strict';
// Node imports
const express = require('express');
const { query, param, body } = require('express-validator');
// Own imports
const { MulterMiddleware } = require('../../middlewares')
const { AuthMiddleware } = require('../../middlewares');
const { AdvertCtrl } = require('../../controllers');

/**
 * Exports arrow function with the ADVERT routes
 */
module.exports = () => {
    const router = express.Router();
    // Rutas de anuncios
    router.get(
        '/', 
        [   query('name').optional().isLength({min:1, max: 40}).withMessage('value must be between 1 and 30 characteres length'),
            query('skip').optional().isInt({ gt: 0 }).withMessage('must be a number greater than 0'),
            query('limit').optional().isInt({ gt: 0 }).withMessage('must be a number greater than 0'),
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
        ],
        AdvertCtrl.select);
    router.get(
        '/book/:slug', 
        AuthMiddleware,
        AdvertCtrl.book);
    router.get(
        '/sell/:slug', 
        AuthMiddleware,
        AdvertCtrl.sell);        
    router.get(
        '/tags', 
        AdvertCtrl.tags);
    router.get(
        '/:slug', 
        AdvertCtrl.selectOne);
    router.delete(
        '/:slug', 
        AuthMiddleware,
        MulterMiddleware,
        AdvertCtrl.delete);
    router.put(
        '/:slug', 
        AuthMiddleware,
        MulterMiddleware, 
        AdvertCtrl.update);
    router.post(
        '/', 
        AuthMiddleware,
        MulterMiddleware, 
        [   body('name').isLength({min:1, max: 40}).withMessage('value must be between 1 and 30 characteres length'),
            body('description').optional().isLength({min:0, max: 150}).withMessage('length must be between 1 and 100 characters'),
            body('price').isNumeric().withMessage('must be numeric')
        ], 
        AdvertCtrl.create);
    // Retorno el router
    return router;
}