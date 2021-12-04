import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../state/accounts/actions';

import { HashRouter, Route, Routes } from 'react-router-dom';

import Settings from '../Settings';
import Home from '../Home';
import Io from '../Io';

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.load());
    return () => dispatch(actions.unload());
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/io" element={<Io />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
