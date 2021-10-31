import { combineReducers } from "redux";
import accounts from "./accounts";

const reducers = {
  accounts
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
