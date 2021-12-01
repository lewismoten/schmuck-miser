import { handleActions } from 'redux-actions';
import produce from 'immer';
import * as actions from './actions';

const initialState = {
  isDownloading: false,
  hasError: false,
  hasDownloaded: false,
};

const onDownloadRequest = produce((draft) => {
  draft.isDownloading = true;
});

const onDownloadSuccess = produce((draft) => {
  draft.hasDownloaded = true;
});

const onDownloadFailure = produce((draft) => {
  draft.hasError = true;
});

const onDownloadFulfill = produce((draft) => {
  draft.isDownloading = false;
});

export default handleActions(
  {
    [actions.download.REQUEST]: onDownloadRequest,
    [actions.download.SUCCESS]: onDownloadSuccess,
    [actions.download.FAILURE]: onDownloadFailure,
    [actions.download.FULFILL]: onDownloadFulfill,
  },
  initialState
);
