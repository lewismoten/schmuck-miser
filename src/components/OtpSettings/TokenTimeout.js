import React, { useEffect, useState, useRef } from 'react';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LIMIT = 30;
const WARN = 4;

const TokenTimeout = () => {
  const { t } = useTranslation();
  const intervalRef = useRef();

  const [seconds, setSeconds] = useState(getSeconds());
  useEffect(() => {
    intervalRef.current = window.setInterval(onInterval, 250);
    return () => {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
  }, []);

  const onInterval = () => {
    if (intervalRef.current) setSeconds(getSeconds());
  };

  const secondsPassed = seconds % LIMIT;
  const secondsLeft = LIMIT - secondsPassed;

  const percent = secondsPassed / LIMIT;
  let value = percent * 100;
  if (seconds >= LIMIT) value *= -1;

  const progressColor = percent > 1 - WARN / LIMIT ? 'warning' : undefined;
  const textColor =
    percent > 1 - WARN / LIMIT ? 'warning.main' : 'text.secondary';

  const label = t('otp.settings.fields.secondsRemaining', {
    seconds: secondsLeft,
  });

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={value}
        color={progressColor}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color={textColor}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

const getSeconds = () => new Date().getSeconds();

export default TokenTimeout;
