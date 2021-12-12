import { lazy } from 'react';
export default lazy(() =>
  import(/* webpackChunkName: '2fa' */ './Security2FASetup')
);
