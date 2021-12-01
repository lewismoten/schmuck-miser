import { all, fork } from 'redux-saga/effects';
import accounts from './accounts/saga';
import io from './io/saga';

function* saga() {
  yield all([fork(accounts), fork(io)]);
}

export default saga;
