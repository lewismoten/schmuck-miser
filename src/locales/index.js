import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import de from './de';
import ru from './ru';
import enUS from './en-US';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    detection: {
      order: ['queryString'],
      cache: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    resources: {
      'en-US': enUS,
      en: enUS,
      de,
      ru,
    },
  });

export default i18n;
