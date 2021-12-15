import { eventChannel } from 'redux-saga';

const SECOND = 1000;
const LIMIT = 30;
const FRAMES_PER_CYCLE = 100;
const INTERVAL = (LIMIT * SECOND) / FRAMES_PER_CYCLE;
const WARN = 4;

function ticker() {
  return eventChannel((emitter) => {
    const onInterval = () => {
      const now = new Date();
      const s = now.getSeconds();
      const ms = now.getMilliseconds();
      const secondsPassed = s % LIMIT;
      const secondsRemaining = LIMIT - secondsPassed;
      const percent = (secondsPassed * SECOND + ms) / (LIMIT * SECOND);
      const isHalfPast = s >= LIMIT;
      const isExpiring = percent > 1 - WARN / LIMIT;

      let value = Math.floor(percent * 100);
      if (isHalfPast) value += 100;

      const progressColor = isExpiring ? 'warning' : undefined;

      emitter({
        seconds: secondsRemaining,
        percent: value,
        color: progressColor,
      });
    };
    const intervalId = setInterval(onInterval, INTERVAL);
    const onUnsubscribe = () => clearInterval(intervalId);
    return onUnsubscribe;
  });
}

export default ticker;
