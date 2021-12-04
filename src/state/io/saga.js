import { all, call, takeEvery, put, select, fork } from 'redux-saga/effects';
import * as actions from './actions';
import * as rootActions from '../actions';
import * as selectors from './selectors';
import saveAsBlob, { watchSaveAsBlob } from './saveAsBlob';
import readAsText, { watchReadAsText } from './readAsText';

function* onDownload() {
  const isDownloading = yield select(selectors.isDownloading);
  if (isDownloading) return;

  const name = yield select(selectors.fileName);
  const data = yield select(selectors.fileData);
  const type = yield select(selectors.fileType);

  const channel = yield call(saveAsBlob, data, type, name);
  yield fork(watchSaveAsBlob, actions.download, channel);
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

  yield put(actions.upload.request());
  const channel = yield call(readAsText, file);
  yield fork(watchReadAsText, actions.readAsText, channel);
}

function* onReadAsTextSuccess(action) {
  const data = JSON.parse(action.payload.result);
  yield put(rootActions.restore(data));
  yield put(actions.upload.success());
}
function* onReadAsTextFulfill() {
  yield put(actions.upload.fulfill());
}

export default function* handleRequestSaga() {
  yield all([
    takeEvery(actions.download.TRIGGER, onDownload),
    takeEvery(actions.upload.TRIGGER, onUpload),
    takeEvery(actions.readAsText.SUCCESS, onReadAsTextSuccess),
    takeEvery(actions.readAsText.FULFILL, onReadAsTextFulfill),
  ]);
}
