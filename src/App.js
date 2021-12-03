import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './state/accounts/actions';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Settings from './route/Settings';
import Home from './route/Home';
import Io from './route/Io';
import ErrorBoundary from './components/ErrorBoundary';
import RouteLoading from './components/RouteLoading';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.load());
    return () => dispatch(actions.unload());
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteLoading />}>
        <BrowserRouter>
          <Routes>
            <Route path="/io" element={<Io />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
