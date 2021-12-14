import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../state/otp/selectors';
import Typography from '@mui/material/Typography';

const QRCode = () => {
  const secret = useSelector(selectors.secret);

  return (
    <Typography align="center" varient="body2">
      {secret}
    </Typography>
  );
};

export default QRCode;
