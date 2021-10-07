import { combineReducers } from 'redux';
import account from './account';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  account,
});
