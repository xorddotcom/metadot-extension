/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainText: 'Success!',
  subText: 'The process is executed successully!',
  isSuccessModalOpen: false,
  loadingFor: '', // this property is here because this is a blacklisted reducer
  authScreenModal: false, // this property is here because this is a blacklisted reducer
  isAuthorizedForSigning: false, // this property is here because this is a blacklisted reducer
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
    setLoadingFor: (state, action) => {
      state.loadingFor = action.payload;
    },
    setAuthScreenModal: (state, action) => {
      state.authScreenModal = action.payload;
    },
    setIsAuthorizedForSigning: (state, action) => {
      state.isAuthorizedForSigning = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMainTextForSuccessModal,
  setSubTextForSuccessModal,
  setIsSuccessModalOpen,
  setLoadingFor,
  setAuthScreenModal,
  setIsAuthorizedForSigning,
} = successModalHandling.actions;

export default successModalHandling.reducer;
