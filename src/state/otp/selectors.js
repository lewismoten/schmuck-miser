import { createSelector } from 'reselect';
import * as qrCode from './qrCode';

const slice = ({ otp = {} } = {}) => otp;

export const secret = createSelector(slice, ({ secret }) => secret);
export const isSettingUp = createSelector(
  slice,
  ({ isSettingUp }) => !!isSettingUp
);
export const isVerified = createSelector(
  slice,
  ({ isVerified }) => !!isVerified
);

export const isEnabled = createSelector(
  secret,
  isSettingUp,
  (secret, isSettingUp) => (isSettingUp ? false : !!secret)
);
export const setupImage = createSelector(
  secret,
  isSettingUp,
  (secret, isSettingUp) =>
    isSettingUp && !!secret ? qrCode.getDataUrl() : undefined
);
