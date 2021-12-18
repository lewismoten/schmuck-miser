import { handleActions } from 'redux-actions';
import produce from 'immer';
import * as actions from './actions';

const initialState = {
  secret: undefined,
  isSettingUp: false,
  isVerified: false,
  seconds: 0,
  milliseconds: 0,
  service: 'OTP Demo',
  user: 'developer',
};

const onChangeTimeout = produce((draft, action) => {
  const { seconds, milliseconds } = action.payload;
  draft.seconds = seconds;
  draft.milliseconds = milliseconds;
});

const cleanup = produce((draft) => {
  if (draft.isSettingUp) {
    draft.secret = undefined;
    draft.isSettingUp = false;
  }
});

const onDisable = produce((draft) => {
  draft.secret = undefined;
  draft.isSettingUp = false;
  draft.isVerified = false;
});

const onSetup = produce((draft) => {
  draft.isVerified = false;
  draft.isSettingUp = true;
});
const onSetupRequest = produce((draft, action) => {
  const { secret } = action.payload;
  draft.secret = secret;
});
const onSetupSuccess = produce((draft) => {
  draft.isVerified = true;
});
const onVerifySuccess = produce((draft) => {
  draft.isVerified = true;
});
const onSetupFulfill = produce((draft) => {
  draft.isSettingUp = false;
});

export default handleActions(
  {
    [actions.disable.TRIGGER]: onDisable,
    [actions.setup.TRIGGER]: onSetup,
    [actions.setup.REQUEST]: onSetupRequest,
    [actions.setup.SUCCESS]: onSetupSuccess,
    [actions.setup.FULFILL]: onSetupFulfill,
    [actions.verify.SUCCESS]: onVerifySuccess,
    [actions.changeTimeout.TRIGGER]: onChangeTimeout,
    [actions.initialize.TRIGGER]: cleanup,
    [actions.uninitialize.TRIGGER]: cleanup,
    [actions.cancelSetup.TRIGGER]: cleanup,
  },
  initialState
);
