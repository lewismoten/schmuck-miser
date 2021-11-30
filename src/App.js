import React, { useEffect, useMemo, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './state/accounts/actions';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';

import Settings from './route/Settings';
import Home from './route/Home';
import Io from './route/Io';
import ErrorBoundary from './components/ErrorBoundary';

import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const dispatch = useDispatch();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    dispatch(actions.load());
    return () => dispatch(actions.unload());
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<CircularProgress />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/io" element={<Io />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
