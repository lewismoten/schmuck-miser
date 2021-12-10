import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/Page';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import * as ioActions from '../../state/io/actions';
import * as ioSelectors from '../../state/io/selectors';
import { useTranslation } from 'react-i18next';

const Io = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isDownloading = useSelector(ioSelectors.isDownloading);
  const isUploading = useSelector(ioSelectors.isUploading);
  const fileRef = useRef();

  const title = t('containers.io.title');
  const downloadButton = t('containers.io.downloadButton');
  const uploadButton = t('containers.io.uploadButton');

  useEffect(() => {
    if (!isUploading && !!fileRef.current) fileRef.current.value = '';
  }, [isUploading]);

  const onClickDownload = () => {
    dispatch(ioActions.download());
  };
  const onChangeFile = ({
    target: {
      files: [file],
    },
  }) => {
    if (!file) return;
    dispatch(ioActions.upload({ file }));
  };
  return (
    <Page title={title}>
      <LoadingButton
        loading={isDownloading}
        startIcon={<FileDownloadIcon />}
        variant="outlined"
        loadingPosition="start"
        onClick={onClickDownload}
      >
        {downloadButton}
      </LoadingButton>
      <LoadingButton
        loading={isUploading}
        startIcon={<FileUploadIcon />}
        variant="outlined"
        loadingPosition="start"
        component="label"
      >
        {uploadButton}
        <input ref={fileRef} type="file" hidden onChange={onChangeFile} />
      </LoadingButton>
    </Page>
  );
};

export default Io;
