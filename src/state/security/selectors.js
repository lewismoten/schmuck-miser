import { createSelector } from 'reselect';
import * as otpCode from './otpCode';

const slice = ({ security = {} } = {}) => security;

export const has2FA = createSelector(slice, ({ otp }) => !!otp);
export const otpDraft = createSelector(slice, ({ otpDraft }) => otpDraft);

export const otp = createSelector(
  slice,
  otpDraft,
  ({ otp }, otpDraft) => otpDraft || otp
);

export const hasOtpDraft = createSelector(otpDraft, (otpDraft) => !!otpDraft);

export const otpImage = createSelector(hasOtpDraft, (hasDraft) =>
  hasDraft ? otpCode.getDataUrl() : undefined
);

export const showOtpInput = createSelector(
  slice,
  has2FA,
  hasOtpDraft,
  ({ otpVerified }, has2FA, hasOtpDraft) =>
    hasOtpDraft || (has2FA && !otpVerified)
);
