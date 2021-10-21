import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [
  ],
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      console.log('In add transaction reducer', action);
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTransaction } = transactionSlice.actions;

// states
// export const addATransaction = (state) => state.transactions.transaction;
// export const getAllTransactions = (state) => state.transactions.transactions;

export default transactionSlice.reducer;
