import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../state/otp/selectors';
import * as actions from '../../state/otp/actions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';

const TokenField = () => {
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
        inputProps={{ autoComplete: 'one-time-code' }}
      />
    </FormControl>
  );
};

export default TokenField;
