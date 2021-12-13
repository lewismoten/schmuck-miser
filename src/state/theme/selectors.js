import { createSelector } from 'reselect';

const slice = ({ theme = {} } = {}) => theme;

export const palette = createSelector(slice, ({ palette = {} }) => palette);
