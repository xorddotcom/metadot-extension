import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthorized: false,
  accountCreated: false,
  seed: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setSeed: (state, action) => {
      state.seed = action.payload;
    },
    resetAccountSlice: (state, action) => {
      console.log('RESET ACCOUNT BY EMPTYING seed value');
      state.seed = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSeed, resetAccountSlice } = accountSlice.actions;

export default accountSlice.reducer;
