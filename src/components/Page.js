import React, { useEffect, useState, useMemo } from 'react';
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
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import PageTitle from './PageTitle';

function Page({ title, children }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        <PageTitle title={title} />
        <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
          <BottomNavigation
            value={bottomNavigationValue}
            onChange={onChangeBottomNavigation}
          >
            <BottomNavigationAction
              label="Home"
              value="/"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              label="Settings"
              value="/settings"
              icon={<SettingsIcon />}
            />
            <BottomNavigationAction
              label="I/O"
              value="/io"
              icon={<SaveIcon />}
            />
          </BottomNavigation>
        </AppBar>
        {children}
      </Box>
    </ThemeProvider>
  );
}

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Page;
