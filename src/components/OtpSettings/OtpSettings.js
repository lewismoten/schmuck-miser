import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../state/otp/selectors';
import * as actions from '../../state/otp/actions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Security2FASetup = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.initialize());
    return () => dispatch(actions.uninitialize());
  }, []);

  return (
    <div>
      <SetupOtpButton />
      <DisableOtpButton />
      <Setup>
        <QRCode />
        <Otp />
        <CancelSetupOtpButton />
        <Timeout />
      </Setup>
    </div>
  );
};

const Setup = ({ children }) => {
  const isSettingUp = useSelector(selectors.isSettingUp);
  return isSettingUp ? children : null;
};
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

const SetupOtpButton = () => {
  const dispatch = useDispatch();
  const isSettingUp = useSelector(selectors.isSettingUp);
  const isEnabled = useSelector(selectors.isEnabled);
  const { t } = useTranslation();
  const label = t('otp.settings.actions.setup');

  const onClick = () => {
    dispatch(actions.setup());
  };

  if (isEnabled || isSettingUp) return null;
  return <Button onClick={onClick}>{label}</Button>;
};
const CancelSetupOtpButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const label = t('otp.settings.actions.cancelSetup');

  const onClick = () => {
    dispatch(actions.cancelSetup());
  };

  return <Button onClick={onClick}>{label}</Button>;
};

const DisableOtpButton = () => {
  const dispatch = useDispatch();
  const isEnabled = useSelector(selectors.isEnabled);
  const { t } = useTranslation();
  const label = t('otp.settings.actions.disable');

  const onClick = () => {
    dispatch(actions.disable());
  };

  if (!isEnabled) return null;
  return <Button onClick={onClick}>{label}</Button>;
};

const Otp = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const isSettingUp = useSelector(selectors.isSettingUp);
  const { t } = useTranslation();
  const label = t('otp.settings.fields.token');
  const helperText = t('otp.settings.fields.tokenHelp');

  if (!isSettingUp) return null;

  const onChange = ({ target: { value: token } }) => {
    if (token.length === 6) {
      dispatch(actions.verify({ token }));
      setValue('');
    } else {
      setValue(token);
    }
  };

  return (
    <FormControl>
      <TextField
        helperText={helperText}
        label={label}
        color="warning"
        type="number"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
};
const Timeout = () => {
  const LIMIT = 30;
  const WARN = 4;

  const intervalRef = useRef();

  const [seconds, setSeconds] = useState(new Date().getSeconds());
  useEffect(() => {
    intervalRef.current = window.setInterval(onInterval, 250);
    return () => {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
  }, []);

  const onInterval = () => {
    if (intervalRef.current) setSeconds(new Date().getSeconds());
  };

  const secondsPassed = seconds % LIMIT;
  const secondsLeft = LIMIT - secondsPassed;

  const percent = secondsPassed / LIMIT;
  let value = Math.floor(percent * 100);
  if (seconds >= LIMIT) value *= -1;

  const progressColor = percent > 1 - WARN / LIMIT ? 'warning' : undefined;
  const textColor =
    percent > 1 - WARN / LIMIT ? 'warning.main' : 'text.secondary';

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
          {secondsLeft}s
        </Typography>
      </Box>
    </Box>
  );
};

export default Security2FASetup;
