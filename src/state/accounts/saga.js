import { all, takeEvery, put, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';

function* onLoad() {
  const isLoading = yield select(selectors.isLoading);
  if (isLoading) return;

  const payload = {
    allIds: [1],
    byId: {
      1: {
        id: 1,
        name: 'first account',
      },
    },
  };

  yield put(actions.load.request());
  yield put(actions.load.success(payload));
  yield put(actions.load.fulfill());
}

export default function* handleRequestSaga() {
  yield all([takeEvery(actions.load.TRIGGER, onLoad)]);
}
