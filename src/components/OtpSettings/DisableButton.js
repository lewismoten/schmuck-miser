import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../state/otp/selectors';
import * as actions from '../../state/otp/actions';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const DisableButton = () => {
  const dispatch = useDispatch();
  const isEnabled = useSelector(selectors.isEnabled);
  const { t } = useTranslation();
  const label = t('otp.settings.actions.disable');

  const onClick = () => {
    dispatch(actions.disable());
  };

  if (!isEnabled) return null;
  return <Button onClick={onClick}>{label}</Button>;
};

export default DisableButton;
