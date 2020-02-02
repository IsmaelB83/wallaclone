'use strict';
// Own imports
const { validationResult } = require('express-validator');
// Node imports
const Sender = require('../../services/thumbnail/sender');
const { Advert } = require('../../models');


/**
 * Controller object
 */
module.exports = {
    
    /**
     * Select adverts from database
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    select: async (req, res, next) => {
        try {
            // Validations
            validationResult(req).throw();
            // Get Adverts
            Advert.list(req.query.name, req.query.venta, req.query.tag, req.query.price, parseInt(req.query.limit), 
                parseInt(req.query.skip), req.query.fields, req.query.sort, function(error, results) {
                if (!error) {
                    // Ok
                    return res.json({
                        success: true,
                        count: results.length,
                        results: results
                    });
                }
                // Error
                next({error});
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Select one advert from database
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    selectOne: async (req, res, next) => {
        try {
            // Validations
            validationResult(req).throw();
            // Get one advert
            let advert = await Advert.findById(req.params.id);   
            if (advert) {
                // Ok
                return res.json({
                    success: true, 
                    result: advert
                });
            }   
            // Error
            next({ status: 404, error: 'Not Found' });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Create advert
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    create: async (req, res, next) => {
        try {
            // Validations
            validationResult(req).throw();
            // New Advert
            let advert = new Advert({...req.body});
            advert.user = req.user.id;
            if (req.file) {
                advert.photo = `/images/adverts/original/${req.file.filename}`;
                advert.thumbnail = advert.photo; // Initially thumbnail refers to the same photo
            }
            advert = await advert.save();
            if (advert) {
                // Send work to rabbitmq
                Sender(advert.photo, advert._id);
                // Ok
                return res.json({
                    success: true, 
                    result: advert
                });
            }
            // Error
            next({error: 'No se ha podido insertar el anuncio'});
        } catch (error) {
            next(error);
        }
    },

    /**
     * Update advert
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    update: async (req, res, next) => {
        try {
            // Validations
            validationResult(req).throw();
            // Sólo se permiten modificar los anuncios propios
            let advert = await Advert.findById(req.params.id);
            if (!advert) {
                // Anuncio no encontrado
                return next({ 
                    status: 404, 
                    error: 'Not Found' 
                });
            } else if (advert.user._id.toString() !== req.user.id) {
                // Un usuario sólo puede modificar sus anuncios
                return next({ 
                    status: 401, 
                    error: 'No autorizado. Sólo puede modificar sus anuncios' 
                });
            }
            // Update advert
            advert = new Advert({...req.body});
            // Si está vendido desmarco el booked
            if (advert.sold) advert.booked = false;
            // Imagen
            if (req.file) {
                advert.photo = `/images/anuncios/${req.file.filename}`;
                advert.thumbnail = img.photo; // Initially the thumbnail points to the same photo
            }
            advert = await Advert.updateAdvert(req.params.id, advert);
            if (advert) {
                // Ok
                return res.json({
                    success: true,
                    result: advert
                });
            } 
            // Error
            return next({
                status: 500, 
                result: 'Error no controlado actualizando anuncio.'
            })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Delete advert
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    delete: async (req, res, next) => {
        try {
            // Sólo se permiten modificar los anuncios propios
            let advert = await Advert.findById(req.params.id);
            if (!advert) {
                // Anuncio no encontrado
                return next({ 
                    status: 404, 
                    error: 'Not Found' 
                });
            } else if (advert.user._id.toString() !== req.user.id) {
                // Un usuario sólo puede modificar sus anuncios
                return next({ 
                    status: 401, 
                    error: 'No autorizado. Sólo puede eliminar sus anuncios' 
                });
            }
            // Ok
            advert = await Advert.findByIdAndDelete(req.params.id);
            return res.json({
                success: true,
                result: advert
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Get all tags from database
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    tags: async (req, res, next) => {
        try {
            // List of tags
            let results = await Advert.find().distinct('tags');
            if (results) {
                // Ok
                return res.json({
                    success: true,
                    count: results.length,
                    results: results
                });
            }
            // Error
            next({ status: 404, error: 'Not Found' });
        } catch (error) {
            next(error);
        }
    }
}