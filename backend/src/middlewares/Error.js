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
    return res.status(jsonError.status).json(jsonError);
};