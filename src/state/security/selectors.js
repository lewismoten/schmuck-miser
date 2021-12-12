import { createSelector } from 'reselect';

const slice = ({ security = {} } = {}) => security;

export const has2FA = createSelector(slice, ({ has2FA }) => !!has2FA);
export const tfaNewSecret = createSelector(
  slice,
  ({ tfaNewSecret }) => tfaNewSecret
);
export const tfaNewQr = createSelector(slice, ({ tfaNewQr }) => tfaNewQr);
