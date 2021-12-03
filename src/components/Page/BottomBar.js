import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';

const BottomBar = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const [bottomNavigationValue, setBottomNavigationValue] = useState(
    location.pathname
  );

  const onChangeBottomNavigation = (e, value) => {
    setBottomNavigationValue(value);
    navigate(value);
  };

  return (
    <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
      <BottomNavigation
        value={bottomNavigationValue}
        onChange={onChangeBottomNavigation}
      >
        <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Settings"
          value="/settings"
          icon={<SettingsIcon />}
        />
        <BottomNavigationAction label="I/O" value="/io" icon={<SaveIcon />} />
      </BottomNavigation>
    </AppBar>
  );
};

export default BottomBar;
