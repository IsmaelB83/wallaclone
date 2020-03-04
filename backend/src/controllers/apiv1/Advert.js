'use strict';
// Own imports
const { validationResult } = require('express-validator');
// Node imports
const { handleThumbnail, handleNotifications } = require('../../services/senders');
const { Advert, User, Chat } = require('../../models');

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
     * Select adverts from database
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    soldHistory: async (req, res, next) => {
        try {
            // Validations
            validationResult(req).throw();
            // Filtrado por usuario logado y vendidos
            Advert.list
            // Get Adverts
            Advert.list(null, null, null, null, null, null, null, null, null, {_id: req.user._id})
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
                if (!advert) {
                    return next({ 
                        status: 404,
                        description: 'Not found any advert with that slug' 
                    });
                }
                return res.status(200).json({
                    success: true, 
                    result: advert
                });
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
                advert.photo = `/images/products/original/${req.file.filename}`;
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
                // Send work to rabbitmq to generate thumbnail
                handleThumbnail(advert.photo, advert._id);
                // Send work to analize potential notifications 
                handleNotifications(result, 'create');
                // Response
                return res.status(201).json({
                    success: true, 
                    result: result
                });
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
                // Check advert exists
                if (!advert) {
                    return next({
                        status: 403, 
                        description: 'You do not have an advert with that slug'
                    });
                }
                // Update advert model
                const updated = {...advert, ...req.body}
                // Image
                let newImage = false;
                if (req.file) {
                    updated.photo = `/images/products/original/${req.file.filename}`;
                    updated.thumbnail = advert.photo; // Initially thumbnail refers to the same photo
                    newImage = true;
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
                    // Ok
                    res.status(200).json({
                        success: true, 
                        result: result 
                    });
                    // Send works to generate thumbnail only in case of new photos
                    if (newImage) {
                        handleThumbnail(advert.photo, advert._id); 
                    }
                    // Send work to analize potential notifications 
                    result.oldPrice = advert.price;
                    handleNotifications(result);    
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
            Advert.findOne({slug: req.params.slug, user: req.user._id})
            .populate('user', '_id login name email avatar')
            .then(advert => {
                // Check advert exists
                if (!advert) {
                    return next({
                        status: 403, 
                        description: 'You do not have an advert with that slug'
                    });
                }
                // Ok
                advert.booked = !advert.booked;
                if (advert.booked) advert.sold = false;
                advert.save().then(advert => {
                    // Ok 
                    res.status(200).json({
                        success: true, 
                        result: advert
                    })
                    // If advert is booked send work to check for potential notifications
                    if (advert.booked) {
                        handleNotifications(advert);    
                    }
                });
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
            Advert.findOne({slug: req.params.slug, user: req.user._id})
            .populate('user', '_id login name email avatar')
            .then(advert => {
                // Check advert exists
                if (!advert) {
                    return next({
                        status: 403, 
                        success: false,
                        description: 'You do not have an advert with that slug'
                    });
                }
                // Ok
                advert.sold = !advert.sold;
                if (advert.sold) advert.booked = false;
                advert.save().then(advert => {
                    // Ok
                    res.status(200).json({
                        success: true, 
                        result: advert 
                    })
                    // If advert is sold send work to check for potential notifications
                    if (advert.sold) {
                        handleNotifications(advert);
                    }
                })
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
            Advert.findOne({slug: req.params.slug, user: req.user._id})
            .populate('user', '_id login name email avatar')
            .then(advert => {
                // Check advert exists
                if (!advert) {
                    return next({
                        status: 403, 
                        description: 'You do not have an advert with that slug'
                    });
                }
                // Ok
                Advert.findByIdAndDelete(advert._id).then(advert => {
                    // Delete reference objects
                    Chat.deleteMany({advert: advert._id}).then(res => console.log(res));
                    User.updateMany({ }, { $pull: { favorites: advert._id } }).then(res => console.log(res));
                    // Ok
                    res.status(200).json({
                        success: true, 
                        result: advert
                    });
                    // When advert is delete send work to analize potential notifications
                    handleNotifications(advert, 'delete'); 
                });
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
                    return res.status(200).json({
                        success: true, 
                        count: results.length, 
                        results: results 
                    });
                }
                // En caso de no haber tags (borrado de muchos anuncios por ejemplo).
                // Devuelvo un listado fijo. En versiones posteriores se incorporará el tag al modelo de mongodb.
                const tags = ['games', 'sports', 'hardware', 'motor', 'clothes', 'comics', 'houses'];
                res.status(200).json({
                    success: true, 
                    count: tags.length, 
                    results: tags 
                });    
            })           
        } catch (error) {
            next(error);
        }
    }
}