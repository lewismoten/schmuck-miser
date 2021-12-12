import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../state/security/selectors';
import * as actions from '../../state/security/actions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';

const Security2FASetup = () => {
  const dispatch = useDispatch();
  const has2FA = useSelector(selectors.has2FA);
  const otpDraft = useSelector(selectors.otpDraft);

  useEffect(() => {
    dispatch(actions.initialize());
  }, []);

  return (
    <div>
      <p>Has 2FA: {has2FA ? 'Yes' : 'No'}</p>
      <p>New Secret: {otpDraft}</p>
      <QRCode />
      <Otp />
      <SetupOtpButton />
    </div>
  );
};

const QRCode = () => {
  const hasOtpDraft = useSelector(selectors.hasOtpDraft);
  const otpImage = useSelector(selectors.otpImage);
  if (!hasOtpDraft) return null;
  return <img src={otpImage} />;
};

const SetupOtpButton = () => {
  const dispatch = useDispatch();
  const hasOtpDraft = useSelector(selectors.hasOtpDraft);
  const has2FA = useSelector(selectors.has2FA);

  const onClick = () => {
    dispatch(actions.setup2FA());
  };

  if (has2FA || hasOtpDraft) return null;
  return <Button onClick={onClick}>Setup 2FA</Button>;
};

const Otp = () => {
  const dispatch = useDispatch();
  const hasOtpDraft = useSelector(selectors.hasOtpDraft);
  const has2FA = useSelector(selectors.has2FA);
  const { t } = useTranslation();
  const label = t('components.security2FASetup.otp.label');
  const helperText = t('components.security2FASetup.otp.helperText');

  if (!(hasOtpDraft || has2FA)) return null;

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
