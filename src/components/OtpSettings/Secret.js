import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../state/otp/selectors';
import Typography from '@mui/material/Typography';
import CopyButton from './CopyButton';

const Secret = () => {
  const secret = useSelector(selectors.secret);

  return (
    <Typography align="center" varient="body2">
      {secret}
      <CopyButton text={secret} />
    </Typography>
  );
};

export default Secret;
