import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../state/security/selectors';
import * as actions from '../../state/security/actions';
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
  const hasOtpDraft = useSelector(selectors.hasOtpDraft);
  const image = useSelector(selectors.otpImage);
  const otpDraft = useSelector(selectors.otpDraft);
  if (!hasOtpDraft) return null;
  return (
    <Card vaiant="outlined">
      <CardMedia component="img" src={image} />
      <CardContent>
        <Typography align="center" varient="body2">
          {otpDraft}
        </Typography>
      </CardContent>
    </Card>
  );
};

const SetupOtpButton = () => {
  const dispatch = useDispatch();
  const hasOtpDraft = useSelector(selectors.hasOtpDraft);
  const has2FA = useSelector(selectors.has2FA);
  const { t } = useTranslation();
  const label = t('components.security2FASetup.setup');

  const onClick = () => {
    dispatch(actions.setup2FA());
  };

  if (has2FA || hasOtpDraft) return null;
  return <Button onClick={onClick}>{label}</Button>;
};
const CancelSetupOtpButton = () => {
  const dispatch = useDispatch();
  const hasOtpDraft = useSelector(selectors.hasOtpDraft);
  const { t } = useTranslation();
  const label = t('components.security2FASetup.cancel');

  const onClick = () => {
    dispatch(actions.cancelSetup2FA());
  };

  if (!hasOtpDraft) return null;
  return <Button onClick={onClick}>{label}</Button>;
};

const DisableOtpButton = () => {
  const dispatch = useDispatch();
  const has2FA = useSelector(selectors.has2FA);
  const { t } = useTranslation();
  const label = t('components.security2FASetup.remove');

  const onClick = () => {
    dispatch(actions.remove2FA());
  };

  if (!has2FA) return null;
  return <Button onClick={onClick}>{label}</Button>;
};

const Otp = () => {
  const dispatch = useDispatch();
  const showOtpInput = useSelector(selectors.showOtpInput);
  const { t } = useTranslation();
  const label = t('components.security2FASetup.otp.label');
  const helperText = t('components.security2FASetup.otp.helperText');

  if (!showOtpInput) return null;

  const onChange = ({ target: { value } }) => {
    if (value.length === 6) {
      dispatch(actions.verifyOtp(value));
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
      />
    </FormControl>
  );
};
export default Security2FASetup;
