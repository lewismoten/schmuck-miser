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

function* onInitialize() {
  yield call(otpCode.clear);
}

export default function* handleRequestSaga() {
  yield all([
    takeEvery(actions.setup2FA.TRIGGER, onSetup2fa),
    takeEvery(actions.initialize.TRIGGER, onInitialize),
  ]);
}
