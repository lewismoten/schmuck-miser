import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../state/otp/actions';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const CancelSetupButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const label = t('otp.settings.actions.cancelSetup');

  const onClick = () => {
    dispatch(actions.cancelSetup());
  };

  return <Button onClick={onClick}>{label}</Button>;
};

export default CancelSetupButton;
