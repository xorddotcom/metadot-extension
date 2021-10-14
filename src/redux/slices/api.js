/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  api: '',
};

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setApi: (state, action) => {
      console.log('Payload in api slice', action.payload);
      state.api = action.payload;
    },
    deleteApi: (state) => {
      state.api = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setApi,
  deleteApi,
} = apiSlice.actions;

export default apiSlice.reducer;
