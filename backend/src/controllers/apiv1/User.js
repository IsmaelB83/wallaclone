"use strict";
// Node imports
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt-nodejs');
const ObjectId = require('mongoose').Types.ObjectId; 
const isValidUsername = require('is-valid-username');
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
            if (user) return next({status: 400, description: 'Error creating user: email already exists'});
            // Check login if the email already exists
            user = await User.findOne({login: req.body.login});
            if (user) return next({status: 400, description: 'Error creating user: login already exists'});
            // Valid user name
            const aux = isValidUsername(req.body.login);
            if (!aux) return next({status: 400, description: 'Nombre de usuario incorrecto.'});
            // User creation
            user = await User.insert(new User({...req.body}));
            if (user) {
                // Send mail
                mail({
                    email: user.email, 
                    name: user.name,
                    subject: 'Activate account',
                    url: `${process.env.FRONTEND_URL}/activate/${user.token}`,
                    view: 'new_user'
                });
                // Ok
                return res.status(201).json({
                    description: 'Check your email to activate the account',
                    user: {
                        _id: user._id,
                        login: user.login,
                        name: user.name,
                        email: user.email
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
     * Edit user
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    edit: async (req, res, next) => {
        try {
            // Obtengo el usuario que se está intentando modificar (el de la sesión activa)
            let user = await User.findById(req.user._id);
            user.name = req.body.name || user.name
            // Si se ha pasado login, y es distinto al actual lo chequeo primero
            if (req.body.login && user.login !== req.body.login) {
                let users = await User.findOne({ 
                    login: req.body.login,  
                    _id: { "$ne": user._id}
                });
                if (users) return next({status: 401, description: 'El login indicado no está disponible' });
                user.login = req.body.login
            }
            // Si se ha pasado email, y es distinto al actual lo chequeo primero
            if (req.body.email && user.email !== req.body.email) {
                let users = await User.findOne({ 
                    email: req.body.email,  
                    _id: { "$ne": user._id}
                });
                if (users) return next({status: 401, description: 'El email indicado no está disponible'});
                user.email = req.body.email
            }
            // Avatar
            if (req.file) {
                user.avatar = `/images/avatars/original/${req.file.filename}`;
            }
            // Si se ha indicado password lo encripto e invalido tokens
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                user.token = '';
                user.jwt = '';
            }
            // Intento guardar
            user.save().then (user => { 
                return res.status(200).json({
                    description: 'Usuario actualizado con éxito',
                    user: {
                        _id: user._id,
                        login: user.login,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar
                    }
                });
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Delete user
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    delete: async (req, res, next) => {
        try {
            let response = await Advert.deleteMany({user: req.params.id});
            if (response) {
                response = await User.deleteOne({_id: ObjectId(req.params.id)});
                return res.status(200).json({
                    success: true,
                    description: 'Usuario y todos sus anuncios eliminados'
                });
            }
            next('error incontrolado')
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
            }
            // Add to user favorites
            const user = await User.findById(req.user._id);
            let favorite = false;
            if (user) {
                // Busco el favorite, si existe lo elimino. si no existe añado. y guardo
                const index = user.favorites.findIndex(favorite => favorite.toString() === advert._id.toString());
                if (index >= 0) {
                    user.favorites.splice(index, 1);
                } else {
                    user.favorites.push(advert._id);                    
                    favorite = true;
                }
                await user.save();
                // Retorno 
                return res.json({
                    success: true,
                    advert: advert,
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


    /**
     * Get user's favorites
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    getFavorites: async (req, res, next) => {
        try {
            // List of adverts
            User.findById(req.user._id)
            .populate('favorites', '-__v')
            .exec((err, result) => {
                if (err) {
                    return next({ status: 404, error: 'Not Found' });
                }
                // Populate de user
                const options = {
                    path: 'favorites.user',
                    model: 'User',
                    select: { '_id': 1, 'login': 1, 'name':1, 'email': 1},
                };
                User.populate(result, options, (err, respop) => {
                    return res.json({
                        success: true,
                        count: respop.favorites.length,
                        results: respop.favorites
                    });
                });
                
            })
        } catch (error) {
            debugger;
            next(error);
        }
    }
}