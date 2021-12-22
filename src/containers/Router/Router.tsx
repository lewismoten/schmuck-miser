import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../state/accounts/actions';
import RootFallback from '../../components/RootFallback';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Settings from '../Settings';
import Home from '../Home';
import Io from '../Io';

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.load());
    return () => {
      dispatch(actions.unload());
    };
  }, []);

  return (
    <Suspense fallback={<RootFallback loading="route" />}>
      <HashRouter>
        <Routes>
          <Route path="/io" element={<Io />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </HashRouter>
    </Suspense>
  );
};

export default Router;
