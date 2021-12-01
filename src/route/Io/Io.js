import React from 'react';
import { useDispatch } from 'react-redux';
import Page from '../../components/Page';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/material/Button';
import * as ioActions from '../../state/io/actions';

const Io = () => {
  const dispatch = useDispatch();

  const onClickDownload = () => {
    dispatch(ioActions.download());
  };
  return (
    <Page title="I/O">
      <Button
        endIcon={<FileDownloadIcon />}
        variant="outlined"
        onClick={onClickDownload}
      >
        Download
      </Button>
    </Page>
  );
};

export default Io;
