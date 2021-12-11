import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../state/security/selectors';

const Security2FASetup = () => {
  const has2FA = useSelector(selectors.has2FA);

  return <div>2fa setup: {has2FA ? 'Enabled' : 'Disabled'}</div>;
};

export default Security2FASetup;
