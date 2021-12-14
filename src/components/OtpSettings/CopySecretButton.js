import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import * as actions from '../../state/otp/actions';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

const CopySecretButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const label = t('otp.settings.actions.copySecret');

  const onClick = () => {
    dispatch(actions.copySecret());
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

CopySecretButton.propTypes = {
  text: PropTypes.string,
};

export default CopySecretButton;
