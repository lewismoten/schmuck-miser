import { all, takeEvery, select, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import * as otp from 'otplib';
import * as otpPreset from '@otplib/preset-default';
import QRCode from 'qrcode';

function* onSetup2fa() {
  const has2FA = yield select(selectors.has2FA);
  if (has2FA) return;

  const secret = otp.authenticator.generateSecret();

  const uri = otpPreset.authenticator.keyuri(
    'User Account',
    'This App',
    secret
  );

  const qr = yield call(QRCode.toDataURL, uri);

  yield put(actions.setup2FA.request({ secret, qr }));
}

export default function* handleRequestSaga() {
  yield all([takeEvery(actions.setup2FA.TRIGGER, onSetup2fa)]);
}
