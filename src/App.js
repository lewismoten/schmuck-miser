import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './state/accounts/actions';

import { HashRouter, Route, Routes } from 'react-router-dom';

import Settings from './route/Settings';
import Home from './route/Home';
import Io from './route/Io';
import ErrorBoundary from './components/ErrorBoundary';
import RootFallback from './components/RootFallback';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.load());
    return () => dispatch(actions.unload());
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<RootFallback />}>
        <HashRouter>
          <Routes>
            <Route path="/io" element={<Io />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </HashRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
