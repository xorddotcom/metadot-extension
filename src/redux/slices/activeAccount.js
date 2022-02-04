/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import constants from '../../constants/onchain';

const { WESTEND_CONFIG } = constants;

const initialState = {
  isLoggedIn: false,
  publicKey: '',
  accountName: '',
  rpcUrl: WESTEND_CONFIG.RPC_URL,
  chainName: WESTEND_CONFIG.CHAIN_NAME,
  tokenName: WESTEND_CONFIG.TOKEN_NAME,
  balance: 0,
  balanceInUsd: 0,
  keyringInitialized: false,
  jsonFileUploadScreen: false,
  prefix: 5,
};

export const activeAccountSlice = createSlice({
  name: 'activeAccount',
  initialState,
  reducers: {
    setKeyringInitialized: (state, action) => {
      state.keyringInitialized = action.payload;
    },
    deleteRedux: (state, action) => {
      state.publicKey = action.payload;
    },
    resetAccountSlice: (state, action) => {
      state.publicKey = '';
      state.isLoggedIn = false;
      state.accountName = '';
      state.balance = 0;
      state.balanceInUsd = false;
      state.jsonFileUploadScreen = false;
    },
    setPublicKey: (state, action) => {
      state.publicKey = action.payload;
    },
    setAccountName: (state, action) => {
      state.accountName = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setRpcUrl: (state, action) => {
      state.rpcUrl = action.payload.rpcUrl;
    },
    setTokenName: (state, action) => {
      state.tokenName = action.payload.tokenName;
    },
    setChainName: (state, action) => {
      state.chainName = action.payload.chainName;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setBalanceInUsd: (state, action) => {
      state.balanceInUsd = action.payload;
    },
    setJsonFileUploadScreen: (state, action) => {
      state.jsonFileUploadScreen = action.payload;
    },
    setPrefix: (state, action) => {
      state.prefix = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  resetAccountSlice,
  setPublicKey,
  setAccountName,
  setLoggedIn,
  setRpcUrl,
  setTokenName,
  setChainName,
  setBalance,
  setBalanceInUsd,
  deleteRedux,
  setKeyringInitialized,
  setJsonFileUploadScreen,
  setPrefix,
} = activeAccountSlice.actions;

export default activeAccountSlice.reducer;
