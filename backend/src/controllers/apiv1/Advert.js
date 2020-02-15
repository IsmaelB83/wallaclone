'use strict';
// Own imports
const { validationResult } = require('express-validator');
// Node imports
const Sender = require('../../services/thumbnail/sender');
const { Advert, User } = require('../../models');

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
            // Filtrado por login de usuario. Necesito su id para reutilizar la busqueda estandar de anuncios
            let user = undefined;
            if (req.query.user) {
                const aux = await User.findOne({login: req.query.user});
                if(aux) user = aux._id;
            } 
            // Get Adverts
            Advert.list(req.query.name, req.query.venta, req.query.tag, req.query.price, user, parseInt(req.query.limit), 
                parseInt(req.query.skip), req.query.fields, req.query.sort)
            .then (result => {
                return res.status(200).json({
                    success: true,
                    start: result.start,
                    end: result.end,
                    totalCount: result.totalCount,
                    results: result.results
                });
            }) 
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
            Advert.findOne({slug: req.params.slug}).populate('user', '_id login name email avatar')
            .then(advert => {
                if (!advert) return next({ status: 404, error: 'Not Found' });
                return res.json({success: true, result: advert});
            })
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
            advert.user = req.user._id;
            if (req.file) {
                advert.photo = `/images/adverts/original/${req.file.filename}`;
                advert.thumbnail = advert.photo; // Initially thumbnail refers to the same photo
            }
            if (req.body.tags) {
                advert.tags = [];
                const tags = req.body.tags.split(',');
                tags.forEach(tag => {
                    advert.tags.push(tag);
                });
            }
            // Update mongo
            advert.save().then(result => {
                // Send work to rabbitmq 
                Sender(advert.photo, advert._id);
                // Response
                return res.json({success: true, result: result});
            })
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
            Advert.findOne({slug: req.params.slug, user: req.user._id})
            .then(advert => {
                // Chequeos
                if (!advert) return next({ status: 401, description: 'No autorizado. Sólo puede tratar sus anuncios'});
                // Update advert model
                const updated = {...advert, ...req.body}
                // Image
                if (req.file) {
                    updated.photo = `/images/adverts/original/${req.file.filename}`;
                    updated.thumbnail = advert.photo; // Initially thumbnail refers to the same photo
                }
                // Tags
                if (req.body.tags) {
                    updated.tags = [];
                    const tags = req.body.tags.split(',');
                    tags.forEach(tag => {
                        updated.tags.push(tag);
                    });
                }
                // Update mongo
                Advert.updateAdvert(advert._id, updated)
                .then(result => {
                    // Send work to rabbitmq (thumbnail generation in microservice)
                    Sender(advert.photo, advert._id);
                    return res.json({success: true, result: result });
                })    
            })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Bookmark advert
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    book: async (req, res, next) => {
        try {
            // Sólo se permiten modificar los anuncios propios
            Advert.findOne({slug: req.params.slug, user: req.user._id}).populate('user', '_id login name email avatar')
            .then(advert => {
                // Chequeos
                if (!advert) return next({status: 401, description: 'No autorizado. Sólo puede tratar sus anuncios'});
                else if (advert.sold) return next({status: 422, description: 'Error. El anuncio ya está vendido.' });
                // Ok
                advert.booked = !advert.booked;
                advert.save().then(advert => res.json({success: true, result: advert}));
            })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Bookmark advert
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    sell: async (req, res, next) => {
        try {
            // Sólo se permiten modificar los anuncios propios
            Advert.findOne({slug: req.params.slug, user: req.user._id}).populate('user', '_id login name email avatar')
            .then(advert => {
                // Chequeos
                if (!advert) return next({ status: 401, description: 'No autorizado. Sólo puede tratar sus anuncios' });
                // Ok
                advert.sold = !advert.sold;
                advert.save().then(advert => res.json({success: true, result: advert }))
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
            Advert.findOne({slug: req.params.slug, user: req.user._id}).populate('user', '_id login name email avatar')
            .then(advert => {
                // Chequeps
                if (!advert) return next({status: 401, description: 'No autorizado. Sólo puede tratar sus anuncios'});
                // Ok
                Advert.findByIdAndDelete(advert._id).then(advert => res.json({success: true, result: advert}));
            })
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
            Advert.find().distinct('tags')
            .then(results => {
                if (results && results.length === 7) {
                    return res.json({success: true, count: results.length, results: results });
                }
                // En caso de no haber tags (borrado de anuncios). Devuelvo un listado fijo. En versiones posteriores se incorporará el tag al modelo de mongodb.
                const tags = ['games', 'sports', 'hardware', 'motor', 'clothes', 'comics', 'houses'];
                return res.json({success: true, count: tags.length, results: tags });    
            })           
        } catch (error) {
            next(error);
        }
    }
}