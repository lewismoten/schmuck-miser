const getChunk = {
  en: () =>
    import(/* webpackChunkName: 'en' */ './locales/en/translation.json'),
  'en-US': () =>
    import(/* webpackChunkName: 'en-US' */ './locales/en-US/translation.json'),
  es: () =>
    import(/* webpackChunkName: 'es' */ './locales/es/translation.json'),
  fa: () =>
    import(/* webpackChunkName: 'fa' */ './locales/fa/translation.json'),
  fr: () =>
    import(/* webpackChunkName: 'fr' */ './locales/fr/translation.json'),
  ja: () =>
    import(/* webpackChunkName: 'ja' */ './locales/ja/translation.json'),
  ru: () =>
    import(/* webpackChunkName: 'ru' */ './locales/ru/translation.json'),
  tlh: () =>
    import(/* webpackChunkName: 'tlh' */ './locales/tlh/translation.json'),
  tr: () =>
    import(/* webpackChunkName: 'tr' */ './locales/tr/translation.json'),
  vi: () =>
    import(/* webpackChunkName: 'vi' */ './locales/vi/translation.json'),
  zh: () =>
    import(/* webpackChunkName: 'zh' */ './locales/zh/translation.json'),
};

class ChunkedBackend {
  read(language = 'en', namespace = 'translation', done) {
    if (!(language in getChunk)) {
      done(`Not found: ${language}`, false);
      return;
    }
    if (namespace !== 'translation') {
      done(`Unknown namespace: ${namespace}`, false);
      return;
    }
    getChunk[language]()
      .then(({ default: n }) => {
        done(null, n);
      })
      .catch((e) => done(e, false));
  }
}

ChunkedBackend.type = 'backend';

export default ChunkedBackend;
