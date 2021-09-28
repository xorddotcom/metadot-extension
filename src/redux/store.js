import { configureStore } from '@reduxjs/toolkit';
import account from './slices/account';

export default configureStore({
  reducer: {
    account,
  },
});
