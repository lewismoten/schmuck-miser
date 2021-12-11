import { combineReducers } from 'redux';
import accounts from './accounts';
import io from './io';
import settings from './settings';
import security from './security';
import * as actions from './actions';

const INITIAL_STATE = {};
const reducers = {
  security,
  accounts,
  io,
  settings,
};

const sliceReducers = combineReducers(reducers);

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.restore.TRIGGER:
      state = {
        ...state,
        ...action.payload,
      };
      break;
    default:
      break;
  }
  return sliceReducers(state, action);
};

export default rootReducer;
