import { call } from 'redux-saga/effects';
import { authenticator } from '@otplib/preset-default';
import QRCode from 'qrcode';

let dataUrl;

export function* render(user, service, secret) {
  dataUrl = undefined;

  const uri = authenticator.keyuri(user, service, secret);

  dataUrl = yield call(QRCode.toDataURL, uri);
}

export const getDataUrl = () => dataUrl;

export const clear = () => {
  dataUrl = undefined;
};

export default { render, getDataUrl, clear };
