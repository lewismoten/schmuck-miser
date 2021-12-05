import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const languages = {
  en: {
    nativeName: 'English',
  },
  de: {
    nativeName: 'Deutsch',
  },
};

const getOptionLabel = (key) => languages[key].nativeName;
const renderOption = (props, option) => (
  <Box component="li" {...props}>
    {getOptionLabel(option)}
  </Box>
);
const renderInput = (inputProps, ...props) => (
  <TextField
    {...props}
    label="Choose a Language"
    inputProps={{ ...inputProps, autoComplete: 'new-password' }}
  />
);

const SelectLanguage = ({ value }) => {
  return (
    <Autocomplete
      value={value}
      options={Object.keys(languages)}
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
