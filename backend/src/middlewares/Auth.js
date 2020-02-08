"use strict";
// Node imports
const jwt = require('jsonwebtoken');
// Own imports
const { User } = require('../models');

/**
 * Middleware to control authentication
 */ 
module.exports = async (req, res, next) => {
    try {
        // Session authentication (web)
        if (!isAPI(req)) {
            if (req.session.authUser) {
                return next();
            }
            return res.redirect('/user/login');
        }
        // JWT Authentication (API)
        let reqToken = ( req.body['headers'] && req.body['headers']['Authorization']) || req.query.token || req.get('Authorization');
        if (!reqToken) {
            return res.status(401).json({
                data: 'Not Authorized'
            });
        }
        // Check JWT is expired
        if (reqToken.startsWith('Bearer') || reqToken.startsWith('bearer')) {
            reqToken = reqToken.split(' ')[1];
        }
        req.token = reqToken;
        const token = jwt.decode(req.token, process.env.SECRET);
        const now = new Date();
        const expire = new Date(token.payload.expires);
        if (now.getTime() >= expire.getTime()) {
            return res.status(401).json({
                data: 'Not Authorized'
            });
        }
        // Check JWT is still valid in database for the specified user. 
        // This is not strictly state-less (a.k.a rest-full), but it grants me more control over the generated tokens.
        // For example, I may allow the user to invalidate their own tokens just by logout (which I am doing in next controller).
        // Also, in case of a security breach, i could instantly invalidate all the active tokens just by setting them to null in database (users collection).
        // On the other hand, this database query impairs a little bit in performance.
        const user = await User.findOne({email: token.payload.email, jwt: reqToken});
        if (!user) {
            return res.status(401).json({
                data: 'Not Authorized. JWT is either not valid or active for the specified user'
            });    
        }
        // User authenticated continue with next middleware
        req.user = token.payload;
        next();        
    } catch (error) {
        next(error);
    }
};

/**
 * Check if URL provides from a request from the API or the Web 
 * @param {Request} req Request
 */
function isAPI(req) {
    return req.originalUrl.indexOf('/api') === 0;
}