import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import * as actions from '../../state/accounts/actions';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Theme = ({ children }) => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(actions.load());
    return () => dispatch(actions.unload());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

Theme.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Theme;
