import { all, takeEvery, select, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';

import * as modules from './modules';
import watchOtpTimer from './watchOtpTimer';

function* onCopySecret() {
  const secret = yield select(selectors.secret);
  const { default: copy } = yield modules.copy();
  yield call(copy, secret, { format: 'text/plain' });
}

function* onSetup() {
  const isSettingUp = yield select(selectors.isSettingUp);
  if (!isSettingUp) return;
  const { authenticator } = yield modules.otplib();
  const secret = authenticator.generateSecret();
  yield put(actions.setup.request({ secret }));

  yield call(watchOtpTimer);
}

function* onVerify(action) {
  const secret = yield select(selectors.secret);
  const { token } = action.payload;
  const { authenticator } = yield modules.otplib();
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

function* cleanup() {}

export default function* handleRequestSaga() {
  yield all([
    takeEvery(actions.setup.TRIGGER, onSetup),
    takeEvery(actions.verify.TRIGGER, onVerify),
    takeEvery(actions.cancelSetup.TRIGGER, onCancelSetup),
    takeEvery(actions.copySecret.TRIGGER, onCopySecret),
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
