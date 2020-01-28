'use strict';
// Import own modules
const i18n = require('i18n');
const path = require('path');

module.exports = () => {
  i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '../../', 'locales'),
    defaultLocale: 'en',
    autoReload: true, // recargar ficheros de idioma si cambian
    syncFiles: true, // crear literales en todos los locales
    cookie: 'nodepop-locale' // used to overwrite language preferences in browser
  });
  return i18n;
};