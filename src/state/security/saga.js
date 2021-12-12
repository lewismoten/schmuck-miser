import { all, takeEvery, select, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import { authenticator } from 'otplib';

import * as otpCode from './otpCode';

function* onSetup2fa() {
  const has2FA = yield select(selectors.has2FA);
  if (has2FA) return;
  const secret = authenticator.generateSecret();
  yield call(otpCode.render, 'me', 'my service', secret);
  yield put(actions.setup2FA.request({ secret }));
}

export default function* handleRequestSaga() {
  yield all([takeEvery(actions.setup2FA.TRIGGER, onSetup2fa)]);
}
