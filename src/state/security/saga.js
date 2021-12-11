import { all, takeEvery, select, put } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import { authenticator } from 'otplib';

function* onSetup2fa() {
  const has2FA = yield select(selectors.has2FA);
  if (has2FA) return;

  const secret = authenticator.generateSecret();
  yield put(actions.setup2FA.request(secret));
}

export default function* handleRequestSaga() {
  yield all([takeEvery(actions.setup2FA.TRIGGER, onSetup2fa)]);
}
