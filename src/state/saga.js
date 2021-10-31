import { all, fork } from "redux-saga/effects";
import accounts from "./accounts/saga";

function* saga() {
  yield all([fork(accounts)]);
}

export default saga;
