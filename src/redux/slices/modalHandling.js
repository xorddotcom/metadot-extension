/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import SuccessCheckIcon from '../../assets/images/modalIcons/success.svg';

const initialState = {
  mainText: 'Success!',
  subText: 'The process is executed successully!',
  responseImage: SuccessCheckIcon,
  isResponseModalOpen: false,
  loadingForApi: false, // this property is here because this is a blacklisted reducer
  authScreenModal: false, // this property is here because this is a blacklisted reducer
  confirmSendModal: false, // this property is here because this is a blacklisted reducer
  derivedAccountModal: false, // this property is here because this is a blacklisted reducer
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
    setLoadingForApi: (state, action) => {
      state.loadingForApi = action.payload;
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
    setDerivedAccountModal: (state, action) => {
      state.derivedAccountModal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMainTextForSuccessModal,
  setSubTextForSuccessModal,
  setIsResponseModalOpen,
  setLoadingForApi,
  setAuthScreenModal,
  setIsAuthorizedForSigning,
  setConfirmSendModal,
  setResponseImage,
  setDerivedAccountModal,
} = modalHandling.actions;

export default modalHandling.reducer;
