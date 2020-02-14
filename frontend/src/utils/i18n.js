import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

import translationEN from '../assets/locales/en/translation.json';
import translationES from '../assets/locales/es/translation.json';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    es: {
        translation: translationES
    }
};

i18n
.use(detector)
.use(reactI18nextModule) // passes i18n down to react-i18next
.init({
    resources,
    lng: 'en',   
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});


export default i18n;