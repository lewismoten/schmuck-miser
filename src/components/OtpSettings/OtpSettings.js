import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../state/otp/actions';

import Masonry from '@mui/lab/Masonry';
import useMediaQuery from '@mui/material/useMediaQuery';

import Setup from './Setup';
import CancelSetupButton from './CancelSetupButton';
import SetupButton from './SetupButton';
import DisableButton from './DisableButton';
import QrCode from './QrCode';
import Secret from './Secret';
import TokenField from './TokenField';
import TokenTimeout from './TokenTimeout';

const Security2FASetup = () => {
  const dispatch = useDispatch();
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const columns = isLandscape ? 2 : 1;

  useEffect(() => {
    dispatch(actions.initialize());
    return () => dispatch(actions.uninitialize());
  }, []);

  return (
    <div>
      <SetupButton />
      <DisableButton />
      <Setup>
        <Masonry columns={columns}>
          <QrCode />
          <Secret />
          <TokenField />
          <CancelSetupButton />
          <TokenTimeout />
        </Masonry>
      </Setup>
    </div>
  );
};

export default Security2FASetup;
