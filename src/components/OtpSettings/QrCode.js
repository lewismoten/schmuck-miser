import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../state/otp/selectors';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

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
      />
    </Box>
  );
};

export default QRCode;
