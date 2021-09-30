import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices';

import logger from 'redux-logger';

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
