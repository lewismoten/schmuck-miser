import { all, takeEvery, select, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import { authenticator } from 'otplib';

import * as otpCode from './otpCode';

function* onSetup2fa() {
  const has2FA = yield select(selectors.has2FA);
  if (has2FA) return;
  const hasOtpDraft = yield select(selectors.hasOtpDraft);
  if (hasOtpDraft) return;
  const secret = authenticator.generateSecret();
  yield call(otpCode.render, 'me', 'my service', secret);
  yield put(actions.setup2FA.request({ secret }));
}

function* onVerifyOtp(action) {
  const secret = yield select(selectors.otp);
  const token = action.payload;
  const isValid = authenticator.check(token, secret);
  const hasOtpDraft = yield select(selectors.hasOtpDraft);
  if (isValid) {
    if (hasOtpDraft) yield put(actions.setup2FA.success());
    yield put(actions.verifyOtp.success());
  } else {
    yield put(actions.verifyOtp.failure());
  }
}

function* onInitialize() {
  yield call(otpCode.clear);
}

export default function* handleRequestSaga() {
  yield all([
    takeEvery(actions.setup2FA.TRIGGER, onSetup2fa),
    takeEvery(actions.verifyOtp.TRIGGER, onVerifyOtp),
    takeEvery(actions.initialize.TRIGGER, onInitialize),
  ]);
}
