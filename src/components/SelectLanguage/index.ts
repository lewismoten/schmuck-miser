import { lazy } from 'react';
export default lazy(() =>
  import(/* webpackChunkName: 'select-language' */ './SelectLanguage')
);
