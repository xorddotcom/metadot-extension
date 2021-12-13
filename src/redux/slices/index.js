import { combineReducers } from 'redux';
import account from './account';
import api from './api';
import modalHandling from './modalHandling';
import transactionProgressModalHandling from './transctionProgressModalHandling';
import transactions from './transactions';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  account,
  api,
  modalHandling,
  transactionProgressModalHandling,
  transactions,
});
