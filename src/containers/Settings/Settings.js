import React from 'react';
import Page from '../../components/Page';
import SelectLanguage from '../../components/SelectLanguage';
import { useTranslation } from 'react-i18next';

import { languages } from '../../i18n';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const __ = (k) => t(`containers.settings.${k}`);

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
