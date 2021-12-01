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

  console.log('name', file.name);
  console.log('size', file.size);
  console.log('type', file.type);
  console.log('last modified', file.lastModifiedDate);

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

  try {
    yield put(actions.upload.request());
    reader.readAsText(file);

    yield put(actions.upload.success());
  } catch (e) {
    yield put(actions.upload.failure());
  } finally {
    yield put(actions.upload.fulfill());
  }
}

export default function* handleRequestSaga() {
  yield all([
    takeEvery(actions.download.TRIGGER, onDownload),
    takeEvery(actions.upload.TRIGGER, onUpload),
  ]);
}
