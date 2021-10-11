/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import constants from '../../constants/onchain';

const initialState = {
  isAuthorized: false,
  accountCreated: false,
  seed: '',
  isLoggedIn: false,
  publicKey: '',
  walletPassword: '',
  rpcUrl: constants.Polkadot_Rpc_Url,
  chainName: 'Polkadot Main Network',
  tokenName: 'DOT',
  balance: 0,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setSeed: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.seed = action.payload;
    },
    resetAccountSlice: (state) => {
      console.log('RESET ACCOUNT BY EMPTYING seed value');
      state.seed = '';
    },
    setPublicKey: (state, action) => {
      state.publicKey = action.payload;
    },
    setWalletPassword: (state, action) => {
      state.walletPassword = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    emptyReduxState: (state) => {
      // state.walletPassword = ""
      // state.seed = ""
      state.publicKey = '';
      // state = initialState
    },
    setRpcUrl: (state, action) => {
      console.log('In redux', action.payload);
      // console.log('Action in set rpc url [][]',action.payload);
      state.rpcUrl = action.payload.rpcUrl;
      state.chainName = action.payload.chainName;
      state.tokenName = action.payload.tokenName;
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
  setWalletPassword,
  setLoggedIn,
  emptyReduxState,
  setRpcUrl,
  setBalance,
} = accountSlice.actions;

export default accountSlice.reducer;
