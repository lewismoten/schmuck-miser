import { createSelector } from 'reselect';

const slice = ({ security = {} } = {}) => security;

export const has2FA = createSelector(slice, ({ has2FA }) => !!has2FA);
