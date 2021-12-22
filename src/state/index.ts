import { combineReducers } from 'redux';

import accounts from './accounts';
import io from './io';
import otp from './otp';
import settings from './settings';
import theme from './theme';

import * as actions from './actions';

const INITIAL_STATE = {};
const reducers = {
  accounts,
  io,
  otp,
  settings,
  theme,
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
