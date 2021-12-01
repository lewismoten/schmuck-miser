import {
  all,
  call,
  take,
  takeEvery,
  put,
  select,
  fork,
  cancelled,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { saveAs } from 'file-saver';

function* onDownload() {
  const isDownloading = yield select(selectors.isDownloading);
  if (isDownloading) return;

  try {
    yield put(actions.download.request());
    const fileName = yield select(selectors.fileName);
    const fileData = yield select(selectors.fileData);
    const fileType = yield select(selectors.fileType);
    const blob = new Blob([fileData], { type: fileType });
    yield call(saveAs, blob, fileName);
    yield put(actions.download.success());
  } catch (e) {
    yield put(actions.download.failure());
  } finally {
    yield put(actions.download.fulfill());
  }
}

function* onUpload(action) {
  const isUploading = yield select(selectors.isUploading);
  if (isUploading) return;

  const { file } = action.payload;

  if (file.type !== 'application/json' || !/.json$/i.test(file.name)) {
    yield put(actions.upload.failure('Expected json'));
    yield put(actions.upload.fulfill());
    return;
  }

  if (file.size <= 0) {
    yield put(actions.upload.failure('File size too small'));
    yield put(actions.upload.fulfill());
    return;
  }

  const channel = yield call(readerBroadcast, file);
  yield fork(watchTheReader, actions.upload, channel);
}

const readerBroadcast = (file) => {
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

function* watchTheReader(routine, channel) {
  yield put(routine.request());
  let fulfill = false;
  while (!fulfill) {
    try {
      let taken = yield take(channel);
      console.log(taken);
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
        case 'loadstart':
        case 'loadend':
          yield put(routine.progress(taken));
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
  yield put(routine.failure());
}
export default function* handleRequestSaga() {
  yield all([
    takeEvery(actions.download.TRIGGER, onDownload),
    takeEvery(actions.upload.TRIGGER, onUpload),
  ]);
}
