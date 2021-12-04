import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Router from './route/Router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './state/configureStore';
import ErrorBoundary from './components/ErrorBoundary';
import RootFallback from './components/RootFallback';

const { store, persistor } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<RootFallback />}>
        <Provider store={store}>
          <PersistGate loading={<RootFallback />} persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
