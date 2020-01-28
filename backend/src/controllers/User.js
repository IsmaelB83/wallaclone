'use strict';
// Node imports
const bcrypt = require('bcrypt-nodejs');
// Own imports
const { User } = require('../models');
const { mail } = require('../utils');


/**
 * Controller object
 */
module.exports = {

    /**
     * Change locale language
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    changeLocale: async (req, res, next) => {
        // Get locale and url to redirect after changing the locale
        const locale = req.params.locale;
        const backTo = req.get('referer');
        // Set cookie for locale preferences
        res.cookie('nodepop-locale', locale, {maxAge: 1000 * 3600 * 24 * 20});
        // Redirect
        res.redirect(backTo);
    },

    /**
     * Render login form
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    formLogin: async (req, res, next) => {
        res.render('pages/login');
    },

    /**
     * After user click on "log in"
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    postLogin: async (req, res, next) => {
        // Get user credentials from form
        const password = req.body.password;
        const email = req.body.email
        // Find user in mongo
        const user = await User.findOne({email: email, active: true});
        if (user) {
            // Compare hashes (use bcrypt to avoid timing attacks as well)
            if (bcrypt.compareSync(password, user.password)) {
                req.session.authUser = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
                return res.redirect('/');
            }
        }
        // Authorization error
        res.locals.status = 401;
        res.locals.email = email;
        res.locals.error = res.__('Not authorized or inactive');
        res.render('pages/login');
    },

    /**
     * Logout session
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    logout: (req, res, next) => {
        req.session.destroy(() => {
            res.redirect('/user/login');
        });
    },

    /**
     * Activate account with token
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
            res.locals.status = 201;
            res.locals.email = user.email;
            res.locals.error = res.__('Account activated. Please login.');
        } else {
            // Authorization error
            res.locals.status = 400;
            res.locals.error = res.__('Wrong token or expired');
        }
        // Render login
        res.render('pages/login');
    },

    /**
     * Render create account form
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    formCreate: async (req, res, next) => {
        res.render('pages/newUser');
    },

    /**
     * After user click on create account
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    postCreate: async (req, res, next) => {
        // Check first if the email already exists
        let user = await User.findOne({email: req.body.email});
        if (user) {
            // Error
            res.locals.status = 400;
            res.locals.error = res.__('Error email aLready exists.');
            return res.render('pages/newUser');
        }
        // Check both passwords are the same
        if (req.body.password === req.body.password2) {
            let user = await User.insert(new User({...req.body}));
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
                res.locals.status = 201;
                res.locals.email = user.email;
                res.locals.error = res.__('Account created. Check your email to activate the account.');
                return res.render('pages/login');
            } else {
                // Error
                res.locals.status = 400;
                res.locals.error = res.__('Error trying to create the account.');
            }
        } else {
            // Error
            res.locals.status = 400;
            res.locals.error = res.__('Error passwords should match.');
        }
        // Render login
        res.render('pages/newUser');
    }
}