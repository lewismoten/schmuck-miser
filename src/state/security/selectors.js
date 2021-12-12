import { createSelector } from 'reselect';
import * as otpCode from './otpCode';

const slice = ({ security = {} } = {}) => security;

export const has2FA = createSelector(slice, ({ has2FA }) => !!has2FA);
export const tfaNewSecret = createSelector(
  slice,
  ({ tfaNewSecret }) => tfaNewSecret
);
export const otpHasNewSecret = createSelector(
  tfaNewSecret,
  (tfaNewSecret) => !!tfaNewSecret
);

export const tfaNewQr = createSelector(otpHasNewSecret, (hasSecret) =>
  hasSecret ? otpCode.getDataUrl() : undefined
);
