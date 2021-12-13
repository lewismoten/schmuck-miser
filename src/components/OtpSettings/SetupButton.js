import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../state/otp/selectors';
import * as actions from '../../state/otp/actions';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const SetupButton = () => {
  const dispatch = useDispatch();
  const isSettingUp = useSelector(selectors.isSettingUp);
  const isEnabled = useSelector(selectors.isEnabled);
  const { t } = useTranslation();
  const label = t('otp.settings.actions.setup');

  const onClick = () => {
    dispatch(actions.setup());
  };

  if (isEnabled || isSettingUp) return null;
  return <Button onClick={onClick}>{label}</Button>;
};
export default SetupButton;
