import { combineReducers } from 'redux';
import account from './account';
import api from './api';
import successModalHandling from './successModalHandling';
import unsuccessModalHandling from './unsuccessModalHandling';
import transactionProgressModalHandling from './transctionProgressModalHandling';
import transactions from './transactions';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  account,
  api,
  successModalHandling,
  unsuccessModalHandling,
  transactionProgressModalHandling,
  transactions,
});
