import { handleActions } from 'redux-actions';
import produce from 'immer';
import * as actions from './actions';

const initialState = {
  otp: undefined,
  otpDraft: undefined,
  otpVerified: false,
};

const cleanup = produce((draft) => {
  delete draft.otpDraft;
});

const onRemove2FA = produce((draft) => {
  draft.otpDraft = undefined;
  draft.otp = undefined;
  draft.otpVerified = false;
});
const onSetup2FARequest = produce((draft, action) => {
  const { secret } = action.payload;
  draft.otpDraft = secret;
});
const onSetup2FASuccess = produce((draft) => {
  draft.otp = draft.otpDraft;
  draft.otpDraft = undefined;
});
const onVerifyOtpSuccess = produce((draft) => {
  draft.otpVerified = true;
});

export default handleActions(
  {
    [actions.remove2FA.TRIGGER]: onRemove2FA,
    [actions.setup2FA.REQUEST]: onSetup2FARequest,
    [actions.setup2FA.SUCCESS]: onSetup2FASuccess,
    [actions.verifyOtp.SUCCESS]: onVerifyOtpSuccess,
    [actions.initialize.TRIGGER]: cleanup,
    [actions.uninitialize.TRIGGER]: cleanup,
    [actions.cancelSetup2FA.TRIGGER]: cleanup,
  },
  initialState
);
