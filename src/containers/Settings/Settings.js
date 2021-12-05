import React from 'react';
import Page from '../../components/Page';
import SelectLanguage from '../../components/SelectLanguage';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const __ = (k) => t(`containers.settings.${k}`);

  const languages = Object.keys(i18n.options.resources);

  const language = i18n.resolvedLanguage;
  const setLanguage = (language) => i18n.changeLanguage(language);

  return (
    <Page title={__`title`}>
      <SelectLanguage
        value={language}
        onChange={setLanguage}
        values={languages}
      />
    </Page>
  );
};
export default Settings;
