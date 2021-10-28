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
      console.log('helllo', state);
    },
    setSeed: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.seed = action.payload;
    },
    resetAccountSlice: (state, action) => {
      console.log('RESET ACCOUNT BY EMPTYING whole account obj');
      // eslint-disable-next-line no-unused-vars
      console.log('action.payload', action.payload);
      state = initialState;
    },
    emptySeedInAccountSlice: (state) => {
      console.log('RESET ACCOUNT BY EMPTYING seed value');
      // eslint-disable-next-line no-unused-vars
      state.seed = '';
    },
    setPublicKey: (state, action) => {
      state.publicKey = action.payload;
    },
    setAccountName: (state, action) => {
      state.accountName = action.payload;
    },
    setWalletPassword: (state, action) => {
      console.log('In account js redux', action.payload);
      state.walletPassword = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setRpcUrl: (state, action) => {
      console.log('In redux', action.payload);
      // console.log('Action in set rpc url [][]',action.payload);
      state.rpcUrl = action.payload.rpcUrl;
    },
    setTokenName: (state, action) => {
      state.tokenName = action.payload.tokenName;
    },
    setChainName: (state, action) => {
      state.chainName = action.payload.chainName;
    },
    setBalance: (state, action) => {
      console.log('Action payload', action.payload);
      state.balance = action.payload;
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
  deleteRedux,
  setKeyringInitialized,
} = accountSlice.actions;

export default accountSlice.reducer;
