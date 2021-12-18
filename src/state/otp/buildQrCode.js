import * as modules from './modules';

const buildQrCode = (data, options) =>
  modules.qrcode().then((qr) => qr.toDataURL(data, options));

export default buildQrCode;
