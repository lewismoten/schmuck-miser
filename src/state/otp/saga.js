import { all, takeEvery, select, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import { authenticator } from 'otplib';

import * as qrCode from './qrCode';

function* onSetup() {
  const secret = authenticator.generateSecret();
  yield call(qrCode.render, 'me', 'my service', secret);
  yield put(actions.setup.request({ secret }));
}

function* onVerify(action) {
  const secret = yield select(selectors.secret);
  const { token } = action.payload;
  const isValid = authenticator.check(token, secret);
  const isSettingUp = yield select(selectors.isSettingUp);
  if (isValid) {
    if (isSettingUp) {
      yield put(actions.setup.success());
      yield put(actions.setup.fulfill());
    }
    yield put(actions.verify.success());
  } else {
    if (isSettingUp) {
      yield put(actions.setup.failure());
    }
    yield put(actions.verify.failure());
  }
}

function* onCancelSetup() {
  const isSettingUp = yield select(selectors.isSettingUp);
  if (isSettingUp) {
    yield put(actions.setup.fulfill());
  }
}

function* cleanup() {
  yield call(qrCode.clear);
}

export default function* handleRequestSaga() {
  yield all([
    takeEvery(actions.setup.TRIGGER, onSetup),
    takeEvery(actions.verify.TRIGGER, onVerify),
    takeEvery(actions.cancelSetup.TRIGGER, onCancelSetup),
    takeEvery(
      [
        actions.initialize.TRIGGER,
        actions.uninitialize.TRIGGER,
        actions.cancelSetup.TRIGGER,
      ],
      cleanup
    ),
  ]);
}
