"use strict";
// Node imports
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt-nodejs');
const ObjectId = require('mongoose').Types.ObjectId; 
const isValidUsername = require('is-valid-username');
// Own imports
const { User, Advert, Chat } = require('../../models');
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
            // Check if email already exists
            let user = await User.findOne({email: req.body.email});
            if (user) {
                return next({
                    status: 403, 
                    description: 'Email already exists'
                });
            }
            // Check if login already exists
            user = await User.findOne({login: req.body.login});
            if (user) {
                return next({
                    status: 403, 
                    description: 'Login already exists'
                });
            }
            // Validate user name
            const aux = isValidUsername(req.body.login);
            if (!aux) { 
                return next({
                    status: 403, 
                    description: 'Invalid username'
                })
            }
            // User creation
            User.insert(new User({...req.body}))
            .then (user => {
                // Send mail and response
                mail({
                    email: user.email, 
                    name: user.name,
                    subject: 'Activate account',
                    url: `${process.env.FRONTEND_URL}/activate/${user.token}`,
                    view: 'new_user'
                });
                res.status(201).json({
                    success: true,
                    user: {
                        _id: user._id,
                        login: user.login,
                        name: user.name,
                        email: user.email
                    }
                });
            })
            .catch(err => next(err));
            
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
                let user = await User.findOne({ 
                    login: req.body.login,  
                    _id: { "$ne": user._id }
                });
                if (user) {
                    return next({
                        status: 403, 
                        description: 'Login not available' 
                    });
                }
                user.login = req.body.login;
            }
            // Si se ha pasado email, y es distinto al actual lo chequeo primero
            if (req.body.email && user.email !== req.body.email) {
                let user = await User.findOne({ 
                    email: req.body.email,  
                    _id: { "$ne": user._id}
                });
                if (user) {
                    return next({
                        status: 403, 
                        description: 'Mail not available'
                    });
                }
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
            user.save()
            .then (user => { 
                res.status(200).json({
                    success: true,
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
        User.deleteOne({_id: ObjectId(req.params.id)})
        .then (user => {
            Chat.deleteMany({users: req.params.id}).then(res => console.log(res));
            Advert.deleteMany({user: req.params.id}).then(res => console.log(res));
            return res.status(200).json({
                success: true,
            });
        })
        .catch(err => next(err));
    },

    /**
     * Set/unset advert as a favorite
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    setFavorite: async (req, res, next) => {
        Advert.findOne({slug: req.params.slug})
        .then (advert => {
            if (!advert) {
                return next({ 
                    status: 404, 
                    description: 'Advert not Found' 
                });
            }
            // Add to user favorites
            User.findById(req.user._id)
            .then(user => {
                if (!user) {
                    return next({ 
                        status: 404, 
                        description: 'User not Found' 
                    });
                }
                // Find favorite set/unset depending on current state
                let favorite = false;
                const i = user.favorites.findIndex(favorite => favorite.toString() === advert._id.toString());
                if (i >= 0) {
                    user.favorites.splice(i, 1);
                } else {
                    user.favorites.push(advert._id);                    
                    favorite = true;
                }
                user.save()
                .then(aux => {
                    return res.json({
                        success: true,
                        advert: advert,
                        favorite: favorite
                    });
                })
                .catch(err => next(err));
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
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
                    return next({ 
                        status: 404, 
                        description: 'User not found' 
                    });
                }
                // Populate de user
                const options = {
                    path: 'favorites.user',
                    model: 'User',
                    select: { '_id': 1, 'login': 1, 'name':1, 'email': 1, 'avatar': 1},
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
            next(error);
        }
    }
}