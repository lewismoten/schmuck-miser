export const otplib = () => import(/* webpackChunkName: 'otplib' */ 'otplib');
export const qrcode = () => import(/* webpackChunkName: 'qrcode' */ 'qrcode');
export const otplibPresetDefault = () =>
  import(
    /* webpackChunkName: 'otplib-preset-default' */ '@otplib/preset-default'
  );
