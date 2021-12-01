import { combineReducers } from 'redux';
import accounts from './accounts';
import io from './io';

const reducers = {
  accounts,
  io,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
