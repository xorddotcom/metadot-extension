/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import constants from '../../constants/onchain';

const initialState = {
  seed: '',
  isLoggedIn: false,
  publicKey: '',
  accountName: '',
  walletPassword: '',
  rpcUrl: constants.Polkadot_Rpc_Url,
  chainName: 'Polkadot Main Network',
  tokenName: 'DOT',
  balance: 0,
  balanceInUsd: 0,
  keyringInitialized: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setKeyringInitialized: (state, action) => {
      state.keyringInitialized = action.payload;
    },
    deleteRedux: (state, action) => {
      state.publicKey = action.payload;
    },
    setSeed: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.seed = action.payload;
    },
    resetAccountSlice: (state, action) => {
      state = initialState;
    },
    emptySeedInAccountSlice: (state) => {
      state.seed = '';
    },
    setPublicKey: (state, action) => {
      state.publicKey = action.payload;
    },
    setAccountName: (state, action) => {
      state.accountName = action.payload;
    },
    setWalletPassword: (state, action) => {
      state.walletPassword = action.payload;
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
  },
});

// Action creators are generated for each case reducer function
export const {
  setSeed,
  resetAccountSlice,
  setPublicKey,
  setAccountName,
  setWalletPassword,
  setLoggedIn,
  setRpcUrl,
  setTokenName,
  setChainName,
  setBalance,
  setBalanceInUsd,
  deleteRedux,
  setKeyringInitialized,
} = accountSlice.actions;

export default accountSlice.reducer;
