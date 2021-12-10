class ChunkedBackend {
  read(language, namespace, done) {
    import(/* webpackChunkName: `[request]` */ `./${language}/${namespace}`)
      .then(({ default: n }) => {
        done(null, n);
      })
      .catch((e) => done(e, false));
  }
}

ChunkedBackend.type = 'backend';

export default ChunkedBackend;
