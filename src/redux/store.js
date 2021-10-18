import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import {
  // FLUSH,
  // PAUSE,
  // PERSIST,
  persistReducer,
  persistStore,
  // PURGE,
  // REGISTER,
  // REHYDRATE,
} from 'redux-persist';

import logger from 'redux-logger';
import { rootReducer } from './slices';

const persistConfig = {
  blacklist: ['successModalHandling'],
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });
const store = configureStore({
  reducer: persistedReducer,
  // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    // serializableCheck: {
    //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    // },
  }).concat(logger),
});

export const persistor = persistStore(store);
export default store;
