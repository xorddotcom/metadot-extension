import { combineReducers } from 'redux';
import activeAccount from './activeAccount';
import accounts from './accounts';
import api from './api';
import modalHandling from './modalHandling';
import transactionProgressModalHandling from './transctionProgressModalHandling';
import transactions from './transactions';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  activeAccount,
  accounts,
  api,
  modalHandling,
  transactionProgressModalHandling,
  transactions,
});
