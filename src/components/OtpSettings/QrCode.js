import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../state/otp/selectors';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const QRCode = () => {
  const setupImage = useSelector(selectors.setupImage);
  const secret = useSelector(selectors.secret);
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

export default QRCode;
