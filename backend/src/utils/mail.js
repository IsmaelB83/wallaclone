"use strict";
// Node import
const path = require('path');
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
            // Conversión del mail a html
            const html = juice(result);
            // Opciones del mail
            let mailOptions = {
                from: 'Nodepop <no-reply@wallaclone.com>',
                to: options.email,
                subject: options.subject,
                text: htmlToText.fromString(html),
                html: html
            }
            // Logo en todos los mails
            mailOptions.attachments = [];
            const file = `${process.cwd()}/public/images/static/logo_large.png`;
            mailOptions.attachments.push({
                path: file,
                filename: 'logo_large.png',
                cid: 'unique@logo'
            })
            // Imagen de producto
            if (options.thumbnail) {
                const path = `${process.cwd()}/public${options.thumbnail}`;
                const file = path.split("/").pop();
                mailOptions.attachments.push({
                    filename: file,
                    path: path,
                    cid: 'unique@photo'
                });
            }
            transport.sendMail(mailOptions)
            .catch (err => console.error(err)); 
        });
        
    } catch (error) {
        console.error(error);
    }
}