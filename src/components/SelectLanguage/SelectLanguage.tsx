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
import { SxProps, SystemProps, SystemStyleObject, Theme } from '@mui/system';

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
  const { dir } = document.body;
  const isRightAligned = dir === 'rtl';

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

  const renderOption = ({style, ...props}: HTMLAttributes<HTMLLIElement>, option: ILanguageCode, state: AutocompleteRenderOptionState): ReactNode => {
    const label = t(`components.selectLanguage.${option}.label`);
    let native = t(`components.selectLanguage.${option}.native`);
    if (label === native || native === t('__META.name.native')) {
      native = '';
    }

    const getDir = (rtl: boolean, code: ILanguageCode): string => {
      if(rtl && code === 'fa') return 'rtl';
      if(rtl && code !== 'fa') return 'ltr';
      return dir;
    }
    const getTextAlign = (rtl: boolean, code: ILanguageCode): string => {
      if(rtl && code === 'fa') return 'right';
      if(rtl && code !== 'fa') return 'left';
      return 'inherit';
    }

    const styles = {
      row: { display: 'flex'},
      nameColumn: { width: '50%'},
      // NOTE: having trouble with typescript accepting "textAlign" and "direction"
      // nativeNameColumn: { width: '50%', direction: getDir(isRightAligned, option)}
      // nativeNameColumn: { width: '50%', textAlign: getTextAlign(isRightAligned, option)}
      nativeNameColumn: { width: '50%'}
    };

    // NOTE: having trouble with typescript allowing spread of props passed to Box
    // <Box sx={styles.row} {...props}>
    return (
      <Box sx={styles.row}>
        <Box sx={styles.nameColumn}>{label}</Box>
        <Box sx={styles.nativeNameColumn}>{native}</Box>
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
