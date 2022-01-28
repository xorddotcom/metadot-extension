import { combineReducers } from '@reduxjs/toolkit';
import activeAccount from './activeAccount';
import accounts from './accounts';
import api from './api';
import modalHandling from './modalHandling';
import txProgressModalHandling from './transactionProgressModalHandling';
import transactions from './transactions';

export const rootReducer = combineReducers({
    activeAccount,
    accounts,
    api,
    modalHandling,
    txProgressModalHandling,
    transactions,
});
