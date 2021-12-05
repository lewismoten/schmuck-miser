import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

const languages = {
  en: {
    nativeName: 'English',
  },
  'en-US': {
    nativeName: 'English (US)',
  },
  de: {
    nativeName: 'Deutsch',
  },
};

const getOptionLabel = (key) => {
  console.log(key);
  if (key in languages) return languages[key].nativeName;
  return key;
};
const renderOption = (props, option) => (
  <Box component="li" {...props}>
    {getOptionLabel(option)}
  </Box>
);

const SelectLanguage = ({ value }) => {
  const { t } = useTranslation();
  const __ = (k) => t(`components.selectLanguage.${k}`);

  const renderInput = (inputProps, ...props) => (
    <TextField
      {...props}
      label={__`inputLabel`}
      inputProps={{ ...inputProps, autoComplete: 'new-password' }}
    />
  );

  return (
    <Autocomplete
      value={value}
      options={Object.keys(languages)}
      autoHighlight
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderInput={renderInput}
    />
  );
};

SelectLanguage.propTypes = {
  value: PropTypes.string,
};

export default SelectLanguage;
