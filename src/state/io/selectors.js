import { createSelector } from 'reselect';

const slice = ({ io = {} } = {}) => io;
export const isDownloading = createSelector(
  slice,
  ({ isDownloading }) => !!isDownloading
);
export const hasDownloadError = createSelector(
  slice,
  ({ hasDownloadError }) => !!hasDownloadError
);
export const hasDownloaded = createSelector(
  slice,
  ({ hasDownloaded }) => !!hasDownloaded
);
export const isUploading = createSelector(
  slice,
  ({ isUploading }) => !!isUploading
);
export const hasUploadError = createSelector(
  slice,
  ({ hasUploadError }) => !!hasUploadError
);
export const hasUploaded = createSelector(
  slice,
  ({ hasUploaded }) => !!hasUploaded
);

export const fileName = () => 'file.json';
export const fileData = (state) =>
  JSON.stringify(
    Object.keys(state)
      .filter((key) => /^[a-z]/.test(key))
      .reduce((keep, key) => {
        keep[key] = state[key];
        return keep;
      }, {}),
    null,
    '  '
  );

export const fileType = () => 'application/json';
