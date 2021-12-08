/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactionProgressMainText: 'Transaction in Progress',
  transactionProgressSubText: 'The process is in progress!',
  isTransactionProgressModalOpen: false,
};

export const transactionProgressModalHandling = createSlice({
  name: 'transactionProgressModalHandling',
  initialState,
  reducers: {
    setMainTextForTransactionProgressModal: (state, action) => {
      state.transactionProgressMainText = action.payload;
    },
    setSubTextForTransactionProgressModal: (state, action) => {
      state.transactionProgressSubText = action.payload;
    },
    setIsTransactionProgressModalOpen: (state, action) => {
      state.isTransactionProgressModalOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMainTextForTransactionProgressModal,
  setSubTextForTransactionProgressModal,
  setIsTransactionProgressModalOpen,
} = transactionProgressModalHandling.actions;

export default transactionProgressModalHandling.reducer;
