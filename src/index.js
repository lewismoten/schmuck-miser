import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from './components/ErrorBoundary';
import RootFallback from './components/RootFallback';
import RootProvider from './components/RootProvider';
import Theme from './components/Theme';
import Router from './containers/Router';
import Localization from './components/Localization';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<RootFallback loading="root provider" />}>
        <RootProvider>
          <Suspense fallback={<RootFallback loading="localization" />}>
            <Localization>
              <Suspense fallback={<RootFallback loading="theme" />}>
                <Theme>
                  <Suspense fallback={<RootFallback loading="router" />}>
                    <Router />
                  </Suspense>
                </Theme>
              </Suspense>
            </Localization>
          </Suspense>
        </RootProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
