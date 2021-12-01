import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/Page';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import * as ioActions from '../../state/io/actions';
import * as ioSelectors from '../../state/io/selectors';

const Io = () => {
  const dispatch = useDispatch();
  const isDownloading = useSelector(ioSelectors.isDownloading);

  const onClickDownload = () => {
    dispatch(ioActions.download());
  };
  const onClickUpload = () => {
    dispatch(ioActions.upload());
  };
  return (
    <Page title="I/O">
      <LoadingButton
        loading={isDownloading}
        startIcon={<FileDownloadIcon />}
        variant="outlined"
        loadingPosition="start"
        onClick={onClickDownload}
      >
        Download
      </LoadingButton>
      <LoadingButton
        loading={isDownloading}
        startIcon={<FileUploadIcon />}
        variant="outlined"
        loadingPosition="start"
        onClick={onClickUpload}
      >
        Upload
      </LoadingButton>
    </Page>
  );
};

export default Io;
