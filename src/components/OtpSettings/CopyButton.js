import React from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

const CopyButton = ({ text }) => {
  const onClick = () => {
    copy(text, {
      debug: true,
      format: 'text/plain',
      message: 'Press #{key} to copy',
    });
  };

  return (
    <IconButton
      onClick={onClick}
      color="primary"
      size="small"
      aria-label="copy 2FA secret key"
    >
      <ContentCopyIcon />
    </IconButton>
  );
};

CopyButton.propTypes = {
  text: PropTypes.string,
};

export default CopyButton;
