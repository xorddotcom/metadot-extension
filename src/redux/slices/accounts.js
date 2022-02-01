/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

// seed
// publicKey
// accountName

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {

    addAccount: (state, action) => {
      state[action.payload.publicKey] = action.payload;
    },

    deleteAccount: (state, action) => {
      console.log('delete accounts ==>>', state);
      delete state[action.payload];
      console.log('delete accounts ==>>', state);
    },
  },
});

export const {
  addAccount,
  deleteAccount,
} = accountsSlice.actions;

export default accountsSlice.reducer;
