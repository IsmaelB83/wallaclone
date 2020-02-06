"use strict";
// Node imports
const { validationResult } = require('express-validator');
// Own imports
const { User, Advert } = require('../../models');
const { mail } = require('../../utils');

/**
 * Controller object
 */
module.exports = {

    /**
     * Creates a new user in the database. In case the e-mail doest not exist already
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    create: async (req, res, next) => {
        try {
            // Validations
            validationResult(req).throw();
            // Check first if the email already exists
            let user = await User.findOne({email: req.body.email});
            if (user) {
                // Error
                return next({
                    status: 400,
                    description: 'Error creating user: email already exists'
                });
            }
            // User creation
            user = await User.insert(new User({...req.body}));
            if (user) {
                // Send mail
                mail({
                    email: user.email, 
                    subject: 'Activate account',
                    url: `http://localhost:3000/activate/${user.token}`,
                    view: 'new_user'
                });
                // Ok
                return res.status(201).json({
                    description: 'Check your email to activate the account',
                    user: {
                        id: user._doc._id,
                        name: user._doc.name,
                        email: user._doc.email
                    }
                });
            }
            // Error
            next({
                status: 400,
                description: 'Error creating user'
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Set/unset advert as a favorite
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    setFavorite: async (req, res, next) => {
        try {
            // Sólo se permiten hacer favorite de un anuncio de otro usu ario
            const advert = await Advert.findOne({slug: req.params.slug});
            if (!advert) {
                // Anuncio no encontrado
                return next({ 
                    status: 404, 
                    description: 'Advert not Found' 
                });
            } else if (advert.user._id.toString() === req.user.id) {
                // Un usuario sólo puede modificar sus anuncios
                return next({ 
                    status: 401, 
                    description: 'Error. Sólo puede hacer favorite de otros anuncios' 
                });
            }
            // Add to user favorites
            const user = await User.findById(req.user.id);
            let favorite = false;
            if (user) {
                // Busco el favorite, si existe lo elimino. si no existe añado
                const index = user.favorites.findIndex(favorite => favorite.toString() === advert._id.toString());
                if (index >= 0) {
                    user.favorites.splice(index, 1);
                } else {
                    user.favorites.push(advert._id);                    
                    favorite = true;
                }
                // Guardo los cambios y retorno
                await user.save();
                return res.json({
                    success: true,
                    _id: advert._id,
                    favorite: favorite
                });
            } 
            // Error
            return next({
                status: 500, 
                description: 'Error no controlado actualizando favorites.'
            })
        } catch (error) {
            next(error);
        }
    },

}