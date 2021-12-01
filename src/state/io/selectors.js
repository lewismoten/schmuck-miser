import { createSelector } from 'reselect';

const slice = ({ io = {} } = {}) => io;
export const isDownloading = createSelector(
  slice,
  ({ isDownloading }) => !!isDownloading
);
export const hasError = createSelector(slice, ({ hasError }) => !!hasError);
export const hasDownloaded = createSelector(
  slice,
  ({ hasDownloaded }) => !!hasDownloaded
);

export const fileName = () => 'file.json';
export const fileData = (state) => JSON.stringify(state, null, '  ');
export const fileType = () => 'application/json';
