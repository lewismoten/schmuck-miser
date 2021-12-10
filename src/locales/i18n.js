import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChunkedBackend from './ChunkedBackend';

i18n
  .use(ChunkedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    detection: {
      order: ['queryString'],
      cache: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
