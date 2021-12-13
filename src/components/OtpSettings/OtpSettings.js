import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../state/otp/actions';

import Setup from './Setup';
import CancelSetupButton from './CancelSetupButton';
import SetupButton from './SetupButton';
import DisableButton from './DisableButton';
import QrCode from './QrCode';
import TokenField from './TokenField';
import TokenTimeout from './TokenTimeout';

const Security2FASetup = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.initialize());
    return () => dispatch(actions.uninitialize());
  }, []);

  return (
    <div>
      <SetupButton />
      <DisableButton />
      <Setup>
        <QrCode />
        <TokenField />
        <CancelSetupButton />
        <TokenTimeout />
      </Setup>
    </div>
  );
};

export default Security2FASetup;
