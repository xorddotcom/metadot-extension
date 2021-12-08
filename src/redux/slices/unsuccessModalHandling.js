/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unsuccessMainText: 'Failed!',
  unsuccessSubText: 'The process is executed unsuccessully!',
  isUnsuccessModalOpen: false,
};

export const unsuccessModalHandling = createSlice({
  name: 'unsuccessModalHandling',
  initialState,
  reducers: {
    setMainTextForUnsuccessModal: (state, action) => {
      state.unsuccessMainText = action.payload;
    },
    setSubTextForUnsuccessModal: (state, action) => {
      state.unsuccessSubText = action.payload;
    },
    setIsUnsuccessModalOpen: (state, action) => {
      state.isUnsuccessModalOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMainTextForUnsuccessModal,
  setSubTextForUnsuccessModal,
  setIsUnsuccessModalOpen,
} = unsuccessModalHandling.actions;

export default unsuccessModalHandling.reducer;
