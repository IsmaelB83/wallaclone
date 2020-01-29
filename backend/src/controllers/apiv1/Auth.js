"use strict";
// Node imports
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
// Own imports
const { User } = require('../../models');

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
        const user = await User.findOne({email: req.body.email, active: true});
        if (user) {
            // Compare hashes (use bcrypt to avoid timing attacks as well)
            if (bcrypt.compareSync(req.body.password, user.password)) {
                // Create the payload and JWT (expiration in 60 minutes after login)
                const payload = {
                    name: user.name,
                    email: user.email,
                    expires: moment().add(60, 'minutes')
                };
                const jwtoken = jwt.sign({payload}, process.env.SECRET);
                user.jwt = jwtoken;
                user.expire = Date.now() + 3600000;
                // Save JWT in the database
                user.save();
                // Return the JWT and user information
                return res.json({
                    success: true,
                    description: 'Authorization successful',
                    user: {
                        name: user.name,
                        email: user.email,
                        token: user.jwt,
                    },
                });
            }
        }
        // Unauthorized
        return next({
            status: 401,
            description: 'Not authorized'
        });
    },

    /**
     * This dummy controller has the only purpose of check if the JWT a user owns is still valid for it's email address.
     * I use it in the application for the first login, in case use has the credentials in the local storage from previous
     * logins.
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    checkJWT: async (req, res, next) => {
        // In case I am here I am authorized (because this controller is private and the middleware is who checks the JWT)
        const user = await User.findOne({email: req.user.email, active: true});
        // Return the JWT and user information
        return res.json({
            success: true,
            description: 'Authorization successful',
            user: {
                name: user.name,
                email: user.email,
                token: user.jwt,
            },
        });
    },

    /**
     * Perform application logout. JWT is invalidated
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    logout: async (req, res, next) => {
        // Find user by email
        const user = await User.findOne({email: req.user.email});
        if (user) {
            // Invalidate the JWT and save user information
            user.expire = null;
            user.jwt = null;
            const response = await user.save();
            // Return the user information without the JWT
            return res.json({
                success: true,
                description: 'User logged out',
                user: {
                    name: response.name,
                    email: response.email,
                    token: user.jwt
                }
            })
        }
        // Unauthorized
        return next({
            status: 401,
            description: 'User not logged in'
        });
    },
}