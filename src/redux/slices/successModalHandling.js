/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainText: 'Success!',
  subText: 'The process is executed successully!',
  isSuccessModalOpen: false,
};

export const successModalHandling = createSlice({
  name: 'successModalHandling',
  initialState,
  reducers: {
    setMainTextForSuccessModal: (state, action) => {
      state.mainText = action.payload;
    },
    setSubTextForSuccessModal: (state, action) => {
      state.subText = action.payload;
    },
    setIsSuccessModalOpen: (state, action) => {
      state.isSuccessModalOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMainTextForSuccessModal,
  setSubTextForSuccessModal,
  setIsSuccessModalOpen,
} = successModalHandling.actions;

export default successModalHandling.reducer;
