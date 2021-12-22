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
  const inputLabel = t('components.selectLanguage.inputLabel');
  const isRightAligned = document.body.dir === 'rtl';

  const handleChange = (e, option, action) => {
    if (action === 'selectOption') onChange(option);
  };

  const renderInput = ({ inputProps, ...props }) => (
    <TextField
      {...props}
      label={inputLabel}
      inputProps={{ ...inputProps, autoComplete: 'new-password' }}
    />
  );

  const selectedOption = value;

  const getOptionLabel = (option) => {
    if (option === '') return '';
    return t(`components.selectLanguage.${option}.label`);
  };

  const renderOption = (props, option) => {
    const label = t(`components.selectLanguage.${option}.label`);
    let native = t(`components.selectLanguage.${option}.native`);
    if (label === native || native === t('__META.name.native')) {
      native = '';
    }
    let textAlign;
    if (!isRightAligned && option === 'fa') {
      textAlign = 'right';
    } else if (isRightAligned && option !== 'fa') {
      textAlign = 'left';
    }

    return (
      <Box sx={{ display: 'flex' }} {...props}>
        <Box sx={{ width: '50%' }}>{label}</Box>
        <Box sx={{ width: '50%', textAlign }}>{native}</Box>
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
