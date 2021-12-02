import {
  take,
  put,
  cancelled,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

const readAsText = (file) => {
  return eventChannel((emitter) => {
    const emitProgress = ({ loaded, total, type }) =>
      emitter({ type, loaded, total });

    const emitProgressAndStop = ({ loaded, total, type }) => {
      emitter({ type, loaded, total });
      emitter(END);
    };

    const emitResult = ({ loaded, total, type }) => {
      emitter({ type, loaded, total, result: reader.result });
    };

    const reader = new FileReader();
    reader.onprogress = emitProgress;
    reader.onloadstart = emitProgress;
    reader.onloadend = emitProgress;
    reader.onerror = emitProgressAndStop;
    reader.onabort = emitProgressAndStop;
    reader.onload = emitResult;
    reader.readAsText(file);
    const unsubscribe = () => {};
    return unsubscribe;
  });
};

function* watchReadAsText(routine, channel) {
  let fulfill = false;
  let fulfilled = false;
  while (!fulfill) {
    try {
      let taken = yield take(channel);
      switch (taken.type) {
        case 'error':
          yield put(routine.failure(taken));
          fulfill = true;
          break;
        case 'abort':
          yield put(routine.abort(taken));
          fulfill = true;
          break;
        case 'progress':
          yield put(routine.progress(taken));
          break;
        case 'loadstart':
          yield put(routine.request(taken));
          break;
        case 'loadend':
          yield put(routine.fulfill(taken));
          fulfill = true;
          fulfilled = true;
          break;
        case 'load':
          yield put(routine.success(taken));
          break;
      }
    } catch (e) {
      yield put(
        routine.failure({
          error: 'error reading file',
        })
      );
      fulfill = true;
    } finally {
      if (yield cancelled()) {
        channel.close();
        fulfill = true;
      }
    }
  }
  if(!fulfilled)
    yield put(routine.fulfill());
}

export default readAsText;
export { watchReadAsText }
