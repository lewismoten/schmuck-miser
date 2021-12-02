/* eslint-env node */
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

import reduxSaga from 'redux-saga';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './index';
const persistedReducer = persistReducer(persistConfig, rootReducer);
import rootSaga from './saga';

const sagaMiddleware = reduxSaga();

const initialState = undefined;

const enhance = applyMiddleware(reduxThunk, sagaMiddleware);
const composed = composeWithDevTools({})(enhance);

const configureStore = () => {
  const store = createStore(persistedReducer, initialState, composed);
  const persistor = persistStore(store);

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./index', () => {
      const reducers = require('./index').default;
      store.replaceReducer(reducers);
    });
  }

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};

export default configureStore;
