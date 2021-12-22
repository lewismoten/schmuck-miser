import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import { eventChannel } from 'redux-saga';

const MS_PER_SECOND = 1000;
const FPS = 3.33;
const INTERVAL = MS_PER_SECOND / FPS;

const elapsed = () => {
  const now = new Date();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  return { seconds, milliseconds };
};

const otpTimer = () =>
  eventChannel((emitter) => {
    const onInterval = () => {
      emitter(elapsed());
    };
    const intervalId = setInterval(onInterval, INTERVAL);
    const onUnsubscribe = () => clearInterval(intervalId);
    return onUnsubscribe;
  });

const closeActions = [
  actions.initialize.TRIGGER,
  actions.uninitialize.TRIGGER,
  actions.cancelSetup.TRIGGER,
  actions.setup.FULFILL,
  actions.verify.SUCCESS,
];

const watchOtpTimer = function* () {
  const channel = yield call(otpTimer);

  const closeChannel = function* () {
    yield channel.close();
  };

  const onInterval = function* (remaining) {
    yield put(actions.changeTimeout(remaining));
  };

  yield all([
    takeEvery(channel, onInterval),
    takeEvery(closeActions, closeChannel),
  ]);
};

export default watchOtpTimer;
