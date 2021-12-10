import React from 'react';
import Page from '../../components/Page';
import SelectLanguage from '../../components/SelectLanguage';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const title = t('containers.settings.title');

  const language = i18n.resolvedLanguage;
  const setLanguage = (language) => i18n.changeLanguage(language);

  return (
    <Page title={title}>
      <SelectLanguage value={language} onChange={setLanguage} />
    </Page>
  );
};
export default Settings;
