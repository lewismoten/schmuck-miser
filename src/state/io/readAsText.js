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
    try {
      reader.readAsText(file);
    } catch (e){
      emitter({ type: 'error', message: e.message });
      emitter(END);
    }
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
          fulfill = true;
          yield put(routine.failure(taken));
          break;
        case 'abort':
          fulfill = true;
          yield put(routine.abort(taken));
          break;
        case 'progress':
          yield put(routine.progress(taken));
          break;
        case 'loadstart':
          yield put(routine.request(taken));
          break;
        case 'loadend':
          fulfill = true;
          fulfilled = true;
          yield put(routine.fulfill(taken));
          break;
        case 'load':
          yield put(routine.success(taken));
          break;
      }
    } catch (e) {
      fulfill = true;
      yield put(
        routine.failure({ type: 'error', message: e.message })
      );
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
