import { all, call, takeEvery, put, select } from 'redux-saga/effects';
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
    console.log('about to call saveAs', blob, fileName);
    yield call(saveAs, blob, fileName);
    yield put(actions.download.success());
  } catch (e) {
    yield put(actions.download.failure());
  } finally {
    yield put(actions.download.fulfill());
  }
}

export default function* handleRequestSaga() {
  yield all([takeEvery(actions.download.TRIGGER, onDownload)]);
}
