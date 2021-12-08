import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import emoji from '@lewismoten/emoji';

const options = [
  { id: 'en-US', label: `${emoji.flagUnitedStates} English (US)` },
  { id: 'en', label: 'English' },
  { id: 'ru', label: 'русский' },
  { id: 'es', label: 'Español' },
  { id: 'tr', label: 'Türk' },
  { id: 'fa', label: 'فارسی' },
  { id: 'fr', label: 'Fransızca' },
  { id: 'de', label: 'Deutsch' },
  { id: 'ja', label: '日本' },
  { id: 'vi', label: 'Tiếng Việt' },
  { id: 'zh', label: '中国人' },
];

const getOptionLabel = (value) => {
  if (typeof value === 'object' && 'label' in value) return value.label;
  const option = options.find(({ id }) => id === value);
  if (option) return option.label;
  console.log('could not find', { value });
  return value;
};
const renderOption = (props, option) => (
  <Box component="li" {...props}>
    {getOptionLabel(option)}
  </Box>
);

const SelectLanguage = ({ value, values, onChange }) => {
  const { t } = useTranslation();
  const __ = (k) => t(`components.selectLanguage.${k}`);

  const handleChange = (e, o, action) => {
    if (action === 'selectOption') onChange(o.id);
  };

  const renderInput = ({ inputProps, ...props }) => (
    <TextField
      {...props}
      label={__`inputLabel`}
      inputProps={{ ...inputProps, autoComplete: 'new-password' }}
    />
  );

  let restrictedOptions = options;
  if (values) {
    restrictedOptions = restrictedOptions.filter(({ id }) =>
      values.includes(id)
    );
  }

  const selectedOption = options.find(({ id }) => id === value);

  return (
    <Autocomplete
      value={selectedOption}
      onChange={handleChange}
      sx={{ width: 300 }}
      options={restrictedOptions}
      autoHighlight
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderInput={renderInput}
    />
  );
};

SelectLanguage.propTypes = {
  value: PropTypes.string,
  values: PropTypes.array,
  onChange: PropTypes.func,
};

export default SelectLanguage;
