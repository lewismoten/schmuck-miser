import { take, put, cancelled } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

const REQUEST = 'request';
const FAILURE = 'failure';
const FULFILL = 'fulfill';
const SUCCESS = 'success';

const saveAsBlob = (data, type, name) => {
  return eventChannel((emitter) => {
    try {
      emitter({ type: REQUEST });
      import(/* webpackChunkName: 'file-saver' */ 'file-saver')
        .then(({ default: fileSaver }) => {
          fileSaver.saveAs(new Blob([data], { type }), name);
          emitter({ type: SUCCESS });
        })
        .catch((e) => {
          emitter({ type: FAILURE, message: e.message });
        })
        .finally(() => {
          emitter({ type: FULFILL });
          emitter(END);
        });
    } catch (e) {
      emitter({ type: FAILURE, message: e.message });
      emitter(END);
    }
    const unsubscribe = () => {};
    return unsubscribe;
  });
};

function* watchSaveAsBlob(routine, channel) {
  let fulfill = false;
  let fulfilled = false;
  while (!fulfill) {
    try {
      let taken = yield take(channel);
      switch (taken.type) {
        case FAILURE:
          fulfill = true;
          yield put(routine.failure(taken));
          break;
        case REQUEST:
          yield put(routine.request(taken));
          break;
        case FULFILL:
          fulfill = true;
          fulfilled = true;
          yield put(routine.fulfill(taken));
          break;
        case SUCCESS:
          yield put(routine.success(taken));
          break;
      }
    } catch (e) {
      fulfill = true;
      yield put(routine.failure({ type: FAILURE, message: e.message }));
    } finally {
      if (yield cancelled()) {
        channel.close();
        fulfill = true;
      }
    }
  }
  if (!fulfilled) yield put(routine.fulfill());
}

export default saveAsBlob;
export { watchSaveAsBlob };
