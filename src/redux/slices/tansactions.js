/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [
    {
      transactionHash: 1,
      accountFrom: 'Hello',
      accountTo: 'World',
      networkFee: 20,
      amount: 302,
      amountInUSD: 107,
      operation: 'Received',
      status: 'Confirmed',
      coin: 'DOT',
    },
    {
      transactionHash: 2,
      accountFrom: 'User 1',
      accountTo: 'User 2',
      networkFee: '10',
      amount: 310,
      amountInUSD: 109,
      operation: 'Received',
      status: 'Confirmed',
      coin: 'DOT',
    },
  ],
  transaction: {
    //   date: '',
    transactionHash: Math.round(Math.random(1 * 100)),
    networkFee: '10',
    amountInUSD: 109,
    operation: 'Received',
    status: 'Confirmed',
    coin: 'DOT',
    accountFrom: '',
    accountTo: '',
    amount: '',
  },
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions = [action.payload, ...state.transactions];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTransaction } = transactionSlice.actions;

// states
// export const addATransaction = (state) => state.transactions.transaction;
// export const getAllTransactions = (state) => state.transactions.transactions;

export default transactionSlice.reducer;
