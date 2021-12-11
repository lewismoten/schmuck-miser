import React from 'react';
import { useDispatch } from 'react-redux';
import Page from '../../components/Page';
import SelectLanguage from '../../components/SelectLanguage';
import { useTranslation } from 'react-i18next';
import * as actions from '../../state/settings/actions';

const Settings = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const title = t('containers.settings.title');

  const language = i18n.resolvedLanguage;
  const setLanguage = (language) => {
    i18n.changeLanguage(language);
    dispatch(actions.changeLanguage(language));
  };

  return (
    <Page title={title}>
      <SelectLanguage value={language} onChange={setLanguage} />
    </Page>
  );
};
export default Settings;
