import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import * as actions from '../state/accounts/actions';

import { useNavigate, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function Page({ title, children }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  const [bottomNavigationValue, setBottomNavigationValue] = useState(
    location.pathname
  );

  const onChangeBottomNavigation = (e, value) => {
    setBottomNavigationValue(value);
    navigate(value);
  };

  useEffect(() => {
    dispatch(actions.load());
    return () => dispatch(actions.unload());
  }, []);

  return (
    <Box className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
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
      {children}
    </Box>
  );
}

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Page;
