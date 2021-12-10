import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';

const BottomBar = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const { t } = useTranslation();
  const homeLabel = t('components.page.bottomBar.homeLabel');
  const settingsLabel = t('components.page.bottomBar.settingsLabel');
  const ioLabel = t('components.page.bottomBar.ioLabel');

  const [bottomNavigationValue, setBottomNavigationValue] = useState(
    location.pathname
  );

  const onChangeBottomNavigation = (e, value) => {
    setBottomNavigationValue(value);
    navigate(value);
  };

  return (
    <AppBar
      position="fixed"
      color="secondary"
      style={{ top: 'auto', bottom: 0 }}
    >
      <BottomNavigation
        value={bottomNavigationValue}
        onChange={onChangeBottomNavigation}
      >
        <BottomNavigationAction
          label={homeLabel}
          value="/"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label={settingsLabel}
          value="/settings"
          icon={<SettingsIcon />}
        />
        <BottomNavigationAction
          label={ioLabel}
          value="/io"
          icon={<SaveIcon />}
        />
      </BottomNavigation>
    </AppBar>
  );
};

export default BottomBar;
