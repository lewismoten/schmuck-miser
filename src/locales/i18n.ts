import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector, { DetectorOptions } from 'i18next-browser-languagedetector';
import ChunkedBackend, { ChunkedOptions, IResourceModule } from './ChunkedBackend';

const detection: DetectorOptions = {
  order: ['queryString'],
  caches: ['localStorage'], // cache or caches? ts wants caches, but was working with cache
}

const chunked: ChunkedOptions = {
  loader: (code, ns) => import(/* webpackChunkName: `[request]` */ `./${code}/${ns}`).then((module: IResourceModule) => module.default)
}

const options: InitOptions = {
  debug: process.env.NODE_ENV === 'development',
  fallbackLng: 'en',
  detection,
  chunked,
  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use(ChunkedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options);

export default i18n;
