import { all, takeEvery, select, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as themeActions from '../theme/actions';
import * as selectors from './selectors';

import * as qrCode from './qrCode';
import * as modules from './utils/modules';

function* authenticatorUrl(user, service, secret) {
  const { authenticator } = yield modules.otplibPresetDefault();
  return yield call(
    [authenticator, authenticator.keyuri],
    user,
    service,
    secret
  );
}
function* onSetup() {
  yield call(qrCode.resetCode);
  const { authenticator } = yield modules.otplib();
  const secret = authenticator.generateSecret();
  const imageOptions = yield select(selectors.imageOptions);
  const data = yield authenticatorUrl('me', 'my service', secret);
  const { toDataURL } = yield modules.qrcode();
  const code = yield call(toDataURL, data, imageOptions);
  yield call(qrCode.setCode, code);
  yield put(actions.setup.request({ secret }));
}

function* onThemeChange() {
  const isSettingUp = yield select(selectors.isSettingUp);
  if (!isSettingUp) return;
  yield call(qrCode.resetCode);
  const secret = yield select(selectors.secret);
  const imageOptions = yield select(selectors.imageOptions);
  const data = yield authenticatorUrl('me', 'my service', secret);

  const { toDataURL } = yield modules.qrcode();
  const code = yield call(toDataURL, data, imageOptions);
  yield call(qrCode.setCode, code);
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
  yield call(qrCode.resetCode);
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
