import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import * as actions from '../../state/theme/actions';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NullableElement } from "../../types/NullableElement";
import {IHasChildren} from '../../types/IHasChildren';

const Theme = ({ children }: IHasChildren): NullableElement => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const dir = i18n.dir();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        direction: dir,
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode, dir]
  );

  useEffect(() => {
    document.body.dir = dir;
  }, [dir]);

  useEffect(() => {
    dispatch(actions.initialize());
    return () => {
      dispatch(actions.uninitialize());
    }
  }, []);

  useEffect(() => {
    dispatch(actions.change(theme));
  }, [theme]);

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
