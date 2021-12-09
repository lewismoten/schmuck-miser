import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

const options = [
  'en-US',
  'en',
  'ru',
  'es',
  'tr',
  'fa',
  'fr',
  'de',
  'ja',
  'vi',
  'zh',
  'tlh',
];

const SelectLanguage = ({ value, onChange }) => {
  const { t } = useTranslation();
  const __ = (k) => t(`components.selectLanguage.${k}`);

  const handleChange = (e, option, action) => {
    if (action === 'selectOption') onChange(option);
  };

  const renderInput = ({ inputProps, ...props }) => (
    <TextField
      {...props}
      label={__('inputLabel')}
      inputProps={{ ...inputProps, autoComplete: 'new-password' }}
    />
  );

  const selectedOption = value;

  const getOptionLabel = (option) => {
    if (option === '') return '';
    return __(`${option}.label`);
  };

  const renderOption = (props, option) => {
    const label = __(`${option}.label`);
    let native = __(`${option}.native`);
    if (label === native || native === t('language')) {
      native = '';
    }

    return (
      <Box sx={{ display: 'flex' }} {...props}>
        <Box sx={{ width: '100%' }}>{label}</Box>
        <Box sx={{ flexShrink: 0 }}>{native}</Box>
      </Box>
    );
  };
  return (
    <Autocomplete
      value={selectedOption}
      onChange={handleChange}
      sx={{ width: 300 }}
      options={options}
      autoHighlight
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderInput={renderInput}
    />
  );
};

SelectLanguage.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectLanguage;
