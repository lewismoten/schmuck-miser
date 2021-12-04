import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../../state/configureStore';
import RootFallback from '../RootFallback';

const { store, persistor } = configureStore();

const RootProvider = ({ children }) => (
  <Provider store={store}>
    <PersistGate
      loading={<RootFallback loading="persisted state" />}
      persistor={persistor}
    >
      {children}
    </PersistGate>
  </Provider>
);

RootProvider.propTypes = {
  children: PropTypes.node,
};

export default RootProvider;
