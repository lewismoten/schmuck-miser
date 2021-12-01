import React from 'react';
import Page from '../../components/Page';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/material/Button';

const Io = () => {
  const onClickDownload = () => {};
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
