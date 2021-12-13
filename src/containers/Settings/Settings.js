import React from 'react';
import { useDispatch } from 'react-redux';
import Page from '../../components/Page';
import SelectLanguage from '../../components/SelectLanguage';
import OtpSettings from '../../components/OtpSettings';
import { useTranslation } from 'react-i18next';
import * as actions from '../../state/settings/actions';

const Settings = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const title = t('containers.settings.title');

  const language = i18n.resolvedLanguage;
  const setLanguage = (language) => {
    dispatch(actions.changeLanguage(language));
  };

  return (
    <Page title={title}>
      <SelectLanguage value={language} onChange={setLanguage} />
      <OtpSettings />
    </Page>
  );
};
export default Settings;
