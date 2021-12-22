import React, { SyntheticEvent, HTMLAttributes, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Autocomplete, { 
  AutocompleteRenderInputParams, 
  AutocompleteChangeReason, 
  AutocompleteChangeDetails,
  AutocompleteRenderOptionState
} from '@mui/material/Autocomplete';
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

type ILanguageCode = string | null

interface ISelectLangauge {
  value: string;
  onChange: (value: ILanguageCode) => void
}

const SelectLanguage = ({ value, onChange }: ISelectLangauge) => {
  const { t } = useTranslation();
  const inputLabel = t('components.selectLanguage.inputLabel');
  const isRightAligned = document.body.dir === 'rtl';

  const handleChange = (event: SyntheticEvent<Element, Event>, value: ILanguageCode, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined) => {
    if (reason === 'selectOption') onChange(value);
  };

  const renderInput = ({ inputProps, ...props }: AutocompleteRenderInputParams) => (
    <TextField
      {...props}
      label={inputLabel}
      inputProps={{ ...inputProps, autoComplete: 'new-password' }}
    />
  );

  const selectedOption = value;

  const getOptionLabel = (option: ILanguageCode) => {
    if (option === '') return '';
    return t(`components.selectLanguage.${option}.label`);
  };

  const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: ILanguageCode, state: AutocompleteRenderOptionState): ReactNode => {
    const label = t(`components.selectLanguage.${option}.label`);
    let native = t(`components.selectLanguage.${option}.native`);
    if (label === native || native === t('__META.name.native')) {
      native = '';
    }
// REVIEW: leaving off here for the night.
// Something is causing problems with <Box sx=
// Thought it was free to pass any css styles you want
// as they are applied...
// look to see if there is a recomended way of applying additional css style
    let nativeName = { width: '50%', textAlign: ''};

    if (!isRightAligned && option === 'fa') {
      nativeName.textAlign = 'right';
    } else if (isRightAligned && option !== 'fa') {
      nativeName.textAlign = 'left';
    }

    return (
      <Box sx={{ display: 'flex' }} {...props}>
        <Box sx={{ width: '50%' }}>{label}</Box>
        <Box sx={nativeName}>{native}</Box>
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
