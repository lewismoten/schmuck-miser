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
      <Chip
        icon={
          <CircularProgress size={14} variant="determinate" value={value} />
        }
        label={label}
        color={color}
      />
    </Box>
  );
};

const sx = {
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default TokenTimeout;
