/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  api: '',
  apiInitializationStarts: false,
  apiInitializationEnds: false,
  apiInitializationCompleted: false,
};

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setApi: (state, action) => {
      state.api = action.payload;
      state.apiInitializationCompleted = true;
      state.apiInitializationEnds = true;
      state.apiInitializationStarts = false;
    },
    setApiInitializationStarts: (state, action) => {
      state.apiInitializationStarts = action.payload;
    },
    setApiInitializationEnds: (state, action) => {
      state.apiInitializationEnds = action.payload;
    },
    deleteApi: (state) => {
      state.api = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setApi, deleteApi, setApiInitializationEnds, setApiInitializationStarts,
} = apiSlice.actions;

export default apiSlice.reducer;
