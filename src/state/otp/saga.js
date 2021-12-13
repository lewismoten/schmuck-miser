import { all, takeEvery, select, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as themeActions from '../theme/actions';
import * as selectors from './selectors';
import { authenticator } from 'otplib';

import * as qrCode from './qrCode';

function* onSetup() {
  const secret = authenticator.generateSecret();
  const imageOptions = yield select(selectors.imageOptions);
  yield call(qrCode.render, 'me', 'my service', secret, imageOptions);
  yield put(actions.setup.request({ secret }));
}

function* onThemeChange() {
  const isSettingUp = yield select(selectors.isSettingUp);
  if (!isSettingUp) return;
  const secret = yield select(selectors.secret);
  const imageOptions = yield select(selectors.imageOptions);
  yield call(qrCode.render, 'me', 'my service', secret, imageOptions);
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
    takeEvery(themeActions.change.TRIGGER, onThemeChange),
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
