import React from 'react';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';
import * as selectors from '../../state/otp/selectors';

const TokenTimeout = () => {
  const { t } = useTranslation();

  const { seconds, percent, isHalfPast, isExpiring } = useSelector(
    selectors.timeout
  );

  if (seconds === undefined) return null;

  const label = t('otp.settings.fields.secondsRemaining', {
    seconds,
  });

  const value = Math.floor(percent * 100) + (isHalfPast ? 100 : 0);
  const color = isExpiring ? 'warning' : undefined;

  return (
    <Box sx={sx.wrapper}>
      <CircularProgress variant="determinate" value={value} color={color} />
      <Box sx={sx.chipWrapper}>
        <Chip label={label} sx={sx.chip} size="small" />
      </Box>
    </Box>
  );
};

const sx = {
  wrapper: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipWrapper: {
    top: 0,
    bottom: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: { borderRadius: '50%', width: '100%', height: '100%' },
};

export default TokenTimeout;
