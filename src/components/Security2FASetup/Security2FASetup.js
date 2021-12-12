import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../state/security/selectors';
import * as actions from '../../state/security/actions';
import Button from '@mui/material/Button';

const Security2FASetup = () => {
  const dispatch = useDispatch();
  const has2FA = useSelector(selectors.has2FA);
  const tfaNewSecret = useSelector(selectors.tfaNewSecret);

  const onClick = () => {
    dispatch(actions.setup2FA());
  };

  return (
    <div>
      <p>2fa setup: {has2FA ? 'Enabled' : 'Disabled'}</p>
      <p>New Secret: {tfaNewSecret}</p>
      <Button onClick={onClick}>Setup 2FA</Button>
    </div>
  );
};

export default Security2FASetup;
