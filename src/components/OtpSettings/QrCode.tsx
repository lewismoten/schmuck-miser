import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../state/otp/selectors';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Fab from '@mui/material/Fab';
import buildQrCode from '../../state/otp/buildQrCode';

const QRCode = () => {
  const [qrCode, setQrCode] = useState();

  const qrData = useSelector(selectors.qrData);
  const qrOptions = useSelector(selectors.qrOptions);
  useEffect(() => {
    setQrCode(undefined);
    if (qrData) buildQrCode(qrData, qrOptions).then(setQrCode);
  }, [qrData, qrOptions]);

  return (
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        padding: '10px',
      }}
    >
      <Box sx={{ width: 200, height: 200, position: 'relative' }}>
        <Avatar
          variant="rounded"
          src={qrCode}
          sx={{
            position: 'absolute',
            width: 200,
            height: 200,
            zIndex: 9,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <PhotoCameraIcon color="error" />
        </Avatar>
        <Box
          sx={{
            position: 'absolute',
            zIndex: 10,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Fab
            size="small"
            sx={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <PhotoCameraIcon />
          </Fab>
        </Box>
      </Box>
    </Box>
  );
};

export default QRCode;
