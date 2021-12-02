import { combineReducers } from 'redux';
import accounts from './accounts';
import io from './io';
import * as actions from './actions';

const INITIAL_STATE = {};
const reducers = {
  accounts,
  io,
};

const sliceReducers = combineReducers(reducers);

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.restore.TRIGGER:
      state = action.payload;
      break;
    default:
      break;
  }
  return sliceReducers(state, action);
};

export default rootReducer;
