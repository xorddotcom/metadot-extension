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
  },
});

export const {
  addAccount,
} = accountsSlice.actions;

export default accountsSlice.reducer;
