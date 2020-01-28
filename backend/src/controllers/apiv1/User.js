"use strict";
// Node imports
const { validationResult } = require('express-validator');
// Own imports
const { User } = require('../../models');
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
                const apiURL = `https://localhost:8443/apiv1/user/activate/${user.token}`;
                const webURL = `https://localhost:8443/user/activate/${user.token}`;
                mail({
                    email: user.email, 
                    subject: 'Activate account',
                    apiURL,
                    webURL,
                    view: 'new_user'
                });
                // Ok
                return res.status(201).json({
                    description: 'User created successfully. Check your email to activate the account.',
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
            if (!error.array) console.log(`Uncontrolled error: ${error}`);
            next(error);
        }
    },
    /**
     * Activate a user account via token
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    activate: async (req, res, next) => {
        let user = await User.findOne({
            token: req.params.token, 
            active: false, 
            expire: { $gt: Date.now()}
        });
        if (user) {
            // Activo el usuario
            user.token = '';
            user.expire = '';
            user.active = true;
            user = await user.save();
            // Ok
            return res.json({
                success: true,
                description: 'Account activated succesfully. You can start using your credentials in nodepop.',
            });
        }
        // No autorizado
        next({status: 400, message: 'Token not valid or expired.'});
    }
}