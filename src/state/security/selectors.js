import { createSelector } from 'reselect';
import { authenticator } from '@otplib/preset-default';

const slice = ({ security = {} } = {}) => security;

export const has2FA = createSelector(slice, ({ has2FA }) => !!has2FA);
export const tfaNewSecret = createSelector(
  slice,
  ({ tfaNewSecret }) => tfaNewSecret
);
export const tfaNewUri = createSelector(tfaNewSecret, (secret) =>
  authenticator.keyuri('User Account', 'This App', secret)
);
