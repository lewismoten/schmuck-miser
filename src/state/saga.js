import { all, fork } from 'redux-saga/effects';
import accounts from './accounts/saga';
import io from './io/saga';
import otp from './otp/saga';

function* saga() {
  yield all([fork(otp), fork(accounts), fork(io)]);
}

export default saga;
