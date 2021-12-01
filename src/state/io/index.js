import { handleActions } from 'redux-actions';
import produce from 'immer';
import * as actions from './actions';

const initialState = {
  isDownloading: false,
  hasDownloadError: false,
  hasDownloaded: false,
  isUploading: false,
  hasUploadError: false,
  hasUploaded: false,
};

const onDownloadRequest = produce((draft) => {
  draft.isDownloading = true;
  draft.hasDownloadError = false;
});

const onDownloadSuccess = produce((draft) => {
  draft.hasDownloaded = true;
});

const onDownloadFailure = produce((draft) => {
  draft.hasDownloadError = true;
});

const onDownloadFulfill = produce((draft) => {
  draft.isDownloading = false;
});

const onUploadRequest = produce((draft) => {
  draft.isUploading = true;
  draft.hasUploadError = false;
});

const onUploadSuccess = produce((draft) => {
  draft.hasUploaded = true;
});

const onUploadFailure = produce((draft) => {
  draft.hasUploadError = true;
});

const onUploadFulfill = produce((draft) => {
  draft.isUploading = false;
});

export default handleActions(
  {
    [actions.download.REQUEST]: onDownloadRequest,
    [actions.download.SUCCESS]: onDownloadSuccess,
    [actions.download.FAILURE]: onDownloadFailure,
    [actions.download.FULFILL]: onDownloadFulfill,
    [actions.upload.REQUEST]: onUploadRequest,
    [actions.upload.SUCCESS]: onUploadSuccess,
    [actions.upload.FAILURE]: onUploadFailure,
    [actions.upload.FULFILL]: onUploadFulfill,
  },
  initialState
);
