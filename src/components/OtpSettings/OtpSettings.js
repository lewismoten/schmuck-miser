import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../state/otp/selectors';
import * as actions from '../../state/otp/actions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const Security2FASetup = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.initialize());
    return () => dispatch(actions.uninitialize());
  }, []);

  return (
    <div>
      <QRCode />
      <Otp />
      <SetupOtpButton />
      <CancelSetupOtpButton />
      <DisableOtpButton />
    </div>
  );
};

const QRCode = () => {
  const isSettingUp = useSelector(selectors.isSettingUp);
  const setupImage = useSelector(selectors.setupImage);
  const secret = useSelector(selectors.secret);
  if (!isSettingUp) return null;
  return (
    <Card vaiant="outlined">
      <CardMedia component="img" src={setupImage} />
      <CardContent>
        <Typography align="center" varient="body2">
          {secret}
        </Typography>
      </CardContent>
    </Card>
  );
};

const SetupOtpButton = () => {
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
const CancelSetupOtpButton = () => {
  const dispatch = useDispatch();
  const isSettingUp = useSelector(selectors.isSettingUp);
  const { t } = useTranslation();
  const label = t('otp.settings.actions.cancelSetup');

  const onClick = () => {
    dispatch(actions.cancelSetup());
  };

  if (!isSettingUp) return null;
  return <Button onClick={onClick}>{label}</Button>;
};

const DisableOtpButton = () => {
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

const Otp = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const isSettingUp = useSelector(selectors.isSettingUp);
  const { t } = useTranslation();
  const label = t('otp.settings.fields.token');
  const helperText = t('otp.settings.fields.tokenHelp');

  if (!isSettingUp) return null;

  const onChange = ({ target: { value: token } }) => {
    if (token.length === 6) {
      dispatch(actions.verify({ token }));
      setValue('');
    } else {
      setValue(token);
    }
  };

  return (
    <FormControl>
      <TextField
        helperText={helperText}
        label={label}
        color="warning"
        type="number"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
};
export default Security2FASetup;
