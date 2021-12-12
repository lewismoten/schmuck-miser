import { all, fork } from 'redux-saga/effects';
import accounts from './accounts/saga';
import io from './io/saga';
import security from './security/saga';

function* saga() {
  yield all([fork(security), fork(accounts), fork(io)]);
}

export default saga;
