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
  },
});

// Action creators are generated for each case reducer function
export const {
  setApi,
} = apiSlice.actions;

export default apiSlice.reducer;
