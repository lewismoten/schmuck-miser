import { createSelector } from 'reselect';

const slice = ({ settings = {} } = {}) => settings;
export const language = createSelector(slice, ({ language }) => language);
