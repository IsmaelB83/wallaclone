"use strict";
// Node imports
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
// Own imports
const { User } = require('../../models');
const { mail } = require('../../utils');

/**
 * Controller object
 */
module.exports = {

    /**
     * Perform application Login trough username/password
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    login: async (req, res, next) => {
        // Find user by email
        User.findOne({login: req.body.login})
        .then(user => {
            // Check account exists
            if (!user || !user.active) {
                return next({
                    status: 401,
                    description: 'Account not found or inactive'
                });
            }                 
            // Compare hashes (use bcrypt to avoid timing attacks as well)
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return next({
                    status: 401,
                    description: 'Wrong password'
                });
            }
            // Create the payload and jwt (expires in 60') and save in mongo
            const payload = {
                _id: user._id,
                name: user.name,
                login: user.login,
                email: user.email,
                expires: moment().add(1200, 'minutes'),
            };
            const jwtoken = jwt.sign({payload}, process.env.SECRET);
            user.jwt = jwtoken;
            user.expire = Date.now() + 72000000;
            user.save();
            // Return jwt and user information
            res.status(200).json({
                success: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    login: user.login,
                    email: user.email,
                    avatar: user.avatar,
                    token: user.jwt,
                    favorites: user.favorites
                }
            });
        })
        .catch(err => next(err));
    },

    /**
     * This dummy controller has the only purpose of check if the JWT a user owns is still valid for it's email address.
     * I use it in the application for the first login, in case use has the credentials in the local storage from previous
     * logins.
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    loginToken: async (req, res, next) => {
        // This is safe, becase in case I am already here, it means the auth middleware alrady validated the jwt
        User.findOne({email: req.user.email, active: true})
        .then (user => {
            if(!user) {
                return next({
                    status: 401,
                    description: 'Account not found'
                });
            }
            res.status(200).json({
                success: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    login: user.login,
                    email: user.email,
                    avatar: user.avatar,
                    token: user.jwt,
                    favorites: user.favorites
                }
            });
        })
        .catch(err => next(err));
    },

    /**
     * Perform application logout. JWT is invalidated
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    logout: async (req, res, next) => {
        // Find user by email
        User.findOne({email: req.user.email})
        .then (user => {
            if (!user) {
                return next({
                    status: 401,
                    description: 'Account not found'
                });
            }
            // Invalidate the JWT, save and response
            user.expire = null;
            user.jwt = null;
            user.save();
            res.status(200).json({
                success: true,
            });
        })
        .catch(err => next(err));
    },

    /**
     * Activate a user account via token
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    activate: async (req, res, next) => {
        // Find user with the specified token
        User.findOne({
            token: req.params.token, 
            active: false, 
            expire: { $gt: Date.now()}
        })
        .then(user => {
            if (!user) {
                return next({
                    status: 401, 
                    description: 'Token not valid or expired. Request reset once again.'
                });
            }
            // Activate user, reset token and response
            user.token = '';
            user.expire = '';
            user.active = true;
            user.save()
            .then(aux => {
                res.status(200).json({
                    success: true,
                });
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    },

    /**
     * Request reset password. Sends an email and set the token
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Siguiente middleware al que llamar
     */
    requestReset: async (req, res, next) => {
        // Find user with that email
        User.findOne({email: req.body.email })
        .then(user => {
            if (!user) {
                return next({
                    status: 404,
                    description: 'Account not found'
                });
            }
            // Set token and save user record
            user.token = crypto.randomBytes(20).toString('hex');
            user.expire = Date.now() + 360000;
            user.save()
            .then(user => {
                // Send mail and response
                mail({
                    email: user.email, 
                    name: user.name,
                    subject: 'Password reset',
                    url: `${process.env.FRONTEND_URL}/reset/${user.token}`,
                    view: 'password_reset'
                });
                res.status(200).json({
                    success: true,
                });
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    },

    /**
     * Set password in case the token specified is valid
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Siguiente middleware al que llamar
     */
    reset: async (req, res, next) => {
        // Find user with the specified token
        User.findOne({
            token: req.params.token, 
            expire: { $gt: Date.now()}
        })
        .then(user => {
            if (!user) {
                return next({
                    status: 401, 
                    error: 'No autorizado'
                });
            }
            // Reset password, save and response
            user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            user.jwt = null;
            user.token = null;
            user.expire = null;
            user.active = true;
            user.save()
            .then (aux => {
                res.json({
                    success: true,
                    description: 'Password updated successfully.',
                });    
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));

    }
}