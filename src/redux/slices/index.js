import { combineReducers } from 'redux';
import account from './account';
import api from './api';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  account,
  api,
});
