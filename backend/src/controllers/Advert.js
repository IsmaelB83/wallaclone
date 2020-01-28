'use strict';
// Node imports
const { validationResult } = require('express-validator');
const moment = require('moment');
// Own imports
const { Advert } = require('../models');

/**
 * Controller object
 */
module.exports = {

    /**
     * Render home page with the list of adverts
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    index: async (req, res, next) => {
        // Validaciones
        validationResult(req).throw();
        // Busco los anuncios en Mongo
        Advert.list(req.query.name, req.query.venta, req.query.tag, req.query.price, parseInt(req.query.limit),
            parseInt(req.query.skip), req.query.fields, req.query.sort, function(error, results) {
            // Error
            if (error) {
                return next({error});
            } 
            // Ok
            res.render('pages/index',  {
                success: true,
                count: results.length,
                results: results,
                moment: moment,
                userName: req.session.authUser.name
            });
        });
    },

    /**
     * Render advert detail
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    detail: async (req, res, next) => {
        // Validaciones
        validationResult(req).throw();
        // Busco el anuncio por ID
        let result = await Advert.findById(req.params.id);
        if (result) {
            return res.render('pages/detail',  {
                success: true,
                result: result,
                moment: moment
            });
        }
        // Si llego aquí es que no se encontró nada
        res.render('pages/error404')
    }
}