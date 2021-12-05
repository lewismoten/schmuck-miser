import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import containersEnglish from './containers/i18n/en.js';

const options = {
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        page: {
          title: 'Home',
          header: 'One <1>Tow</1> Tree',
        },
        containers: containersEnglish,
      },
    },
  },
};

console.log(options);
i18n.use(LanguageDetector).use(initReactI18next).init(options);

export default i18n;
