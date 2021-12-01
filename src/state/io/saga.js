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

  yield put(actions.upload.request());

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

  const reader = new FileReader();
  // reader.onerror = (e) => {
  //   console.log('onerror', e);
  // };
  // reader.onprogress = (e) => {
  //   console.log('onprogress', e);
  // };
  // reader.onabort = (e) => {
  //   console.log('onabort', e);
  // };
  // reader.onloadstart = ({ loaded, total }) => {
  //   console.log('onloadstart', 100 * (loaded / total));
  // };
  // reader.onloadend = ({ loaded, total }) => {
  //   console.log('onloadend', 100 * (loaded / total));
  // };
  reader.onload = () => {
    console.log('onLoad', reader.result);
  };

  reader.readAsText(file);
  yield put(actions.upload.success());
  // yield put(actions.upload.failure());
  yield put(actions.upload.fulfill());
}

export default function* handleRequestSaga() {
  yield all([
    takeEvery(actions.download.TRIGGER, onDownload),
    takeEvery(actions.upload.TRIGGER, onUpload),
  ]);
}
