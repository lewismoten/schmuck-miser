import { all, takeEvery, select, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as themeActions from '../theme/actions';
import * as selectors from './selectors';

import * as cache from './cache';
import * as modules from './modules';
import watchOtpTimer from './watchOtpTimer';

function* onCopySecret() {
  const secret = yield select(selectors.secret);
  const { default: copy } = yield modules.copy();
  yield call(copy, secret, { format: 'text/plain' });
}

function* creatQrCode(secret) {
  const service = yield select(selectors.service);
  const user = yield select(selectors.user);
  yield call(cache.resetCode);
  const { authenticator } = yield modules.otplibPresetDefault();
  const data = yield call(
    [authenticator, authenticator.keyuri],
    user,
    service,
    secret
  );
  const imageOptions = yield select(selectors.imageOptions);
  const { toDataURL } = yield modules.qrcode();
  const code = yield call(toDataURL, data, imageOptions);
  yield call(cache.setCode, code);
}
function* onSetup() {
  const isSettingUp = yield select(selectors.isSettingUp);
  if (!isSettingUp) return;
  const { authenticator } = yield modules.otplib();
  const secret = authenticator.generateSecret();
  yield creatQrCode(secret);
  yield put(actions.setup.request({ secret }));

  yield call(watchOtpTimer);
}

function* onThemeChange() {
  const isSettingUp = yield select(selectors.isSettingUp);
  if (!isSettingUp) return;
  const secret = yield select(selectors.secret);
  yield creatQrCode(secret);
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

function* cleanup() {
  yield call(cache.resetCode);
}

export default function* handleRequestSaga() {
  yield all([
    takeEvery(actions.setup.TRIGGER, onSetup),
    takeEvery(actions.verify.TRIGGER, onVerify),
    takeEvery(actions.cancelSetup.TRIGGER, onCancelSetup),
    takeEvery(actions.copySecret.TRIGGER, onCopySecret),
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
