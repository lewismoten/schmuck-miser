import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const SECOND = 1000;
const LIMIT = 30;
const INTERVAL = (LIMIT * SECOND) / 100;

const TokenTimeout = () => {
  const { t } = useTranslation();
  const intervalRef = useRef();

  const [{ secondsRemaining, value, progressColor }, setDetails] = useState(
    getDetails()
  );

  useEffect(() => {
    intervalRef.current = window.setInterval(onInterval, INTERVAL);
    return () => {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
  }, []);

  const onInterval = () => {
    if (intervalRef.current) setDetails(getDetails());
  };

  const label = t('otp.settings.fields.secondsRemaining', {
    seconds: secondsRemaining,
  });

  return (
    <Box sx={sx.wrapper}>
      <CircularProgress
        variant="determinate"
        value={value}
        color={progressColor}
      />
      <Box sx={sx.chipWrapper}>
        <Chip label={label} sx={sx.chip} size="small" />
      </Box>
    </Box>
  );
};

const getDetails = () => {
  const WARN = 4;

  const now = new Date();
  const s = now.getSeconds();
  const ms = now.getMilliseconds();
  const secondsPassed = s % LIMIT;
  const secondsRemaining = LIMIT - secondsPassed;
  const percent = (secondsPassed * SECOND + ms) / (LIMIT * SECOND);
  const isHalfPast = s >= LIMIT;
  const isExpiring = percent > 1 - WARN / LIMIT;

  let value = Math.floor(percent * 100);
  if (isHalfPast) value += 100;

  const progressColor = isExpiring ? 'warning' : undefined;

  return {
    secondsRemaining,
    value,
    progressColor,
  };
};

const sx = {
  wrapper: { position: 'relative', display: 'inline-flex' },
  chipWrapper: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: { borderRadius: '50%', width: '100%', height: '100%' },
};

export default TokenTimeout;
