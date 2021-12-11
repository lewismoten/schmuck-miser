import { all, takeEvery, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';

function* onSetup2fa() {
  const has2FA = yield select(selectors.has2FA);
  if (has2FA) return;
}

export default function* handleRequestSaga() {
  yield all([takeEvery(actions.setup2FA.TRIGGER, onSetup2fa)]);
}
