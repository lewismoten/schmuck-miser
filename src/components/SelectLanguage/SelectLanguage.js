import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import emoji from '@lewismoten/emoji';

const options = [
  { id: 'en-US', label: `${emoji.flagUnitedStates} English (US)` },
  { id: 'en', label: `${emoji.flagUnitedStates} English` },
  { id: 'ru', label: `${emoji.flagRussia} русский` },
  { id: 'es', label: `${emoji.flagSpain} Español` },
  { id: 'tr', label: `${emoji.flagTurkey} Türk` },
  { id: 'fa', label: `${emoji.flagIran} فارسی` },
  { id: 'fr', label: `${emoji.flagFrance} Fransızca` },
  { id: 'de', label: `${emoji.flagGermany} Deutsch` },
  { id: 'ja', label: `${emoji.flagJapan} 日本` },
  { id: 'vi', label: `${emoji.flagVietnam} Tiếng Việt` },
  { id: 'zh', label: `${emoji.flagChina} 中国人` },
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
