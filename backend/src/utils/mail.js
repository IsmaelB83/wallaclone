"use strict";
// Node imports
const htmlToText = require('html-to-text');
const nodemailer = require('nodemailer');
const ejs = require('ejs-promise');
const juice = require('juice');

// Load env variables
require('dotenv').config();

// Consts
const mailViews = `${__dirname}/../views/mails/`;

/* // Nodemailer configuration (with mailtrap)
const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
}); */

// Nodemailer configuration (with sendgrip)
const transport = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASS
    }
}); 

/**
 * Generate HTML content from a ejs template
 * @param {View} view EJS template 
 * @param {Object} options Options
 */
const generateHTML = async (view, options = {}) => {
    return ejs.renderFile(`${mailViews}${view}.ejs`, options, {}, (error, result) => {
        if (error) {
            throw 'Error generating mail template'
        }
        return result;  
    });
};

module.exports = (options) => {
    try {
        generateHTML(options.view, options)
        .then(result => {
            const html = juice(result);
            let mailOptions = {
                from: 'Nodepop <no-reply@nodepop.com>',
                to: options.email,
                subject: options.subject,
                text: htmlToText.fromString(html),
                html: html
            }
            transport.sendMail(mailOptions);
        });
        
    } catch (error) {
        console.log(error);
    }
}
