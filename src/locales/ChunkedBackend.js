const getChunk = {
  de: () => import(/* webpackChunkName: 'locale-de' */ './de/translation.json'),
  en: () => import(/* webpackChunkName: 'locale-en' */ './en/translation.json'),
  'en-US': () =>
    import(/* webpackChunkName: 'locale-en-US' */ './en-US/translation.json'),
  es: () => import(/* webpackChunkName: 'locale-es' */ './es/translation.json'),
  fa: () => import(/* webpackChunkName: 'locale-fa' */ './fa/translation.json'),
  fr: () => import(/* webpackChunkName: 'locale-fr' */ './fr/translation.json'),
  ja: () => import(/* webpackChunkName: 'locale-ja' */ './ja/translation.json'),
  ru: () => import(/* webpackChunkName: 'locale-ru' */ './ru/translation.json'),
  tlh: () =>
    import(/* webpackChunkName: 'locale-tlh' */ './tlh/translation.json'),
  tr: () => import(/* webpackChunkName: 'locale-tr' */ './tr/translation.json'),
  vi: () => import(/* webpackChunkName: 'locale-vi' */ './vi/translation.json'),
  zh: () => import(/* webpackChunkName: 'locale-zh' */ './zh/translation.json'),
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
