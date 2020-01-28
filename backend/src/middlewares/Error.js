"use strict";

module.exports = (error, req, res, next) => {
    // Default error
    const jsonError = {
        status: error.status || 500,
        data: error.description || error.message || 'Uncontrolled error'
    }
    // Validation errors
    if (error.array) { 
        const errInfo = error.array({ onlyFirstError: true })[0];
        jsonError.status = 422;
        jsonError.data = `Validation failed: ${errInfo.param} ${errInfo.msg}`;
    } else if (error.status === 422) {
        jsonError.data = `Validation failed: ${error.param} ${error.msg}`; 
    }
    // API Middleware
    if (isAPI(req)) {
        return res.status(jsonError.status).json(jsonError);
    }
    // Render the 404 error page
    if (jsonError.status === 404) {
        return res.render('pages/error404');
    }
    // Web Version
    res.locals.message = jsonError.data;
    res.locals.error = error;
    next({error: jsonError});
};

/**
 * Check if URL provides from a request from the API or the Web 
 * @param {Request} req Request
 */
function isAPI(req) {
    return req.originalUrl.indexOf('/api') === 0;
}
 