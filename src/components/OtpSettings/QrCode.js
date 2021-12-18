import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../state/otp/selectors';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const QRCode = () => {
  const setupImage = useSelector(selectors.setupImage);

  return (
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        padding: '10px',
      }}
    >
      <Avatar
        variant="rounded"
        src={setupImage}
        sx={{ width: 200, height: 200 }}
      >
        <QrCode2Icon color="error" sx={{ width: 50, height: 50 }} />
      </Avatar>
    </Box>
  );
};

export default QRCode;
