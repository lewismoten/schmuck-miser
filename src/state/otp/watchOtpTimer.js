import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import { eventChannel } from 'redux-saga';

const MS_PER_SECOND = 1000;
const SECONDS_PER_TOKEN = 30;
const PROGRESS_MAX = 100;
const FRAMES_PER_TOKEN = Math.max(PROGRESS_MAX, SECONDS_PER_TOKEN);
const INTERVAL = (SECONDS_PER_TOKEN * MS_PER_SECOND) / FRAMES_PER_TOKEN;
const WARN_SECONDS = 4;

const calcRemaining = () => {
  const now = new Date();

  const s = now.getSeconds();
  const ms = now.getMilliseconds();

  const secondsPassed = s % SECONDS_PER_TOKEN;
  const secondsRemaining = SECONDS_PER_TOKEN - secondsPassed;

  const percent =
    (secondsPassed * MS_PER_SECOND + ms) / (SECONDS_PER_TOKEN * MS_PER_SECOND);

  const isHalfPast = s >= SECONDS_PER_TOKEN;
  const isExpiring = percent > 1 - WARN_SECONDS / SECONDS_PER_TOKEN;

  let value = Math.floor(percent * PROGRESS_MAX);

  if (isHalfPast) value += PROGRESS_MAX;

  const progressColor = isExpiring ? 'warning' : undefined;

  return {
    seconds: secondsRemaining,
    percent: value,
    color: progressColor,
  };
};

const otpTimer = () =>
  eventChannel((emitter) => {
    const onInterval = () => {
      emitter(calcRemaining());
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
