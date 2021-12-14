import React from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

const CopyButton = ({ text }) => {
  const { t } = useTranslation();
  const label = t('otp.settings.actions.copySecret');

  const onClick = () => {
    copy(text, { format: 'text/plain' });
  };

  return (
    <IconButton
      onClick={onClick}
      color="primary"
      size="small"
      aria-label={label}
    >
      <ContentCopyIcon />
    </IconButton>
  );
};

CopyButton.propTypes = {
  text: PropTypes.string,
};

export default CopyButton;
