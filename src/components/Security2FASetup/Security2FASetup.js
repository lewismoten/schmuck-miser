import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../state/security/selectors';
import * as actions from '../../state/security/actions';
import Button from '@mui/material/Button';

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
export default Security2FASetup;
