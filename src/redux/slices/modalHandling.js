/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import SuccessCheckIcon from '../../assets/images/success.png';

const initialState = {
  mainText: 'Success!',
  subText: 'The process is executed successully!',
  responseImage: SuccessCheckIcon,
  isResponseModalOpen: false,
  loadingFor: '', // this property is here because this is a blacklisted reducer
  authScreenModal: false, // this property is here because this is a blacklisted reducer
  confirmSendModal: false, // this property is here because this is a blacklisted reducer
  isAuthorizedForSigning: false, // this property is here because this is a blacklisted reducer
};

export const modalHandling = createSlice({
  name: 'modalHandling',
  initialState,
  reducers: {
    setMainTextForSuccessModal: (state, action) => {
      state.mainText = action.payload;
    },
    setSubTextForSuccessModal: (state, action) => {
      state.subText = action.payload;
    },
    setResponseImage: (state, action) => {
      state.responseImage = action.payload;
    },
    setIsResponseModalOpen: (state, action) => {
      state.isResponseModalOpen = action.payload;
    },
    setLoadingFor: (state, action) => {
      state.loadingFor = action.payload;
    },
    setAuthScreenModal: (state, action) => {
      state.authScreenModal = action.payload;
    },
    setConfirmSendModal: (state, action) => {
      state.confirmSendModal = action.payload;
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
  setIsResponseModalOpen,
  setLoadingFor,
  setAuthScreenModal,
  setIsAuthorizedForSigning,
  setConfirmSendModal,
  setResponseImage,
} = modalHandling.actions;

export default modalHandling.reducer;
