import { createSelector } from 'reselect';
import * as otpCode from './otpCode';

const slice = ({ security = {} } = {}) => security;

export const has2FA = createSelector(slice, ({ otp }) => !!otp);

export const otp = createSelector(
  slice,
  ({ otpDraft, otp }) => otpDraft || otp
);

export const otpDraft = createSelector(slice, ({ otpDraft }) => otpDraft);
export const hasOtpDraft = createSelector(otpDraft, (otpDraft) => !!otpDraft);

export const otpImage = createSelector(hasOtpDraft, (hasDraft) =>
  hasDraft ? otpCode.getDataUrl() : undefined
);
