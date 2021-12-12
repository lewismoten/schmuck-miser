import { handleActions } from 'redux-actions';
import produce from 'immer';
import * as actions from './actions';

const initialState = {
  otp: undefined,
  otpDraft: undefined,
};

const onInitialize = produce((draft) => {
  delete draft.otpDraft;
});

const onSetup2FARequest = produce((draft, action) => {
  const { secret } = action.payload;
  draft.otpDraft = secret;
});
const onSetup2FASuccess = produce((draft) => {
  draft.otp = draft.otpDraft;
  draft.otpDraft = undefined;
});

export default handleActions(
  {
    [actions.setup2FA.REQUEST]: onSetup2FARequest,
    [actions.setup2FA.SUCCESS]: onSetup2FASuccess,
    [actions.initialize.TRIGGER]: onInitialize,
  },
  initialState
);
