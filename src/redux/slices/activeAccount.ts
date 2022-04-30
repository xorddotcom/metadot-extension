import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import constants from '../../constants/onchain';
import { ActiveAccount } from '../types';

const { POLKADOT_CONFIG } = constants;

const initialState: ActiveAccount = {
    isLoggedIn: true,
    publicKey: '5FZ9DWna1Wq3nR7FoAmyLURQkgBXkS4MeghjcoXc1e6PeAxK',
    accountName: 'Ahsan',
    rpcUrl: POLKADOT_CONFIG.rpcUrl,
    chainName: POLKADOT_CONFIG.name,
    tokenName: POLKADOT_CONFIG.tokenName,
    tokenImage: POLKADOT_CONFIG.logo,
    balance: 0,
    balanceInUsd: 0,
    jsonFileUploadScreen: false,
    prefix: POLKADOT_CONFIG.prefix,
    lastVisitedTimestamp: '',
    queryEndpoint: POLKADOT_CONFIG.queryEndpoint,
    isWalletConnected: false,
    balances: [{ name: '', balance: '', isNative: false, decimal: 0 }],
};

export const activeAccountSlice = createSlice({
    name: 'activeAccount',
    initialState,
    reducers: {
        setLastVisitedTimestamp: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                lastVisitedTimestamp: action.payload,
            };
        },
        deleteRedux: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                publicKey: action.payload,
            };
        },
        resetAccountSlice: (state) => {
            return {
                ...state,
                publicKey: '',
                isLoggedIn: false,
                accountName: '',
                balance: 0,
                balances: [
                    { name: '', balance: '', isNative: false, decimal: 0 },
                ],
                balanceInUsd: 0,
                jsonFileUploadScreen: false,
                rpcUrl: POLKADOT_CONFIG.rpcUrl,
                chainName: POLKADOT_CONFIG.name,
                tokenName: POLKADOT_CONFIG.tokenName,
                tokenImage: POLKADOT_CONFIG.logo,
                queryEndpoint: POLKADOT_CONFIG.queryEndpoint,
            };
        },
        setPublicKey: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                publicKey: action.payload,
            };
        },
        setAccountName: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                accountName: action.payload,
            };
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        },
        setRpcUrl: (state, action: PayloadAction<string>) => {
            return { ...state, rpcUrl: action.payload };
        },
        setTokenName: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                tokenName: action.payload,
            };
        },

        setTokenImage: (state, action: PayloadAction<string>) => {
            return { ...state, tokenImage: action.payload };
        },
        setQueryEndpoint: (state, action: PayloadAction<string>) => {
            return { ...state, queryEndpoint: action.payload };
        },
        setChainName: (state, action: PayloadAction<string>) => {
            return { ...state, chainName: action.payload };
        },
        setBalance: (state, action: PayloadAction<number>) => {
            return { ...state, balance: action.payload };
        },
        setBalanceInUsd: (state, action: PayloadAction<number>) => {
            return { ...state, balanceInUsd: action.payload };
        },
        setJsonFileUploadScreen: (state, action: PayloadAction<boolean>) => {
            return { ...state, jsonFileUploadScreen: action.payload };
        },
        setPrefix: (state, action: PayloadAction<number>) => {
            return { ...state, prefix: action.payload };
        },
        setWalletConnected: (state, action: PayloadAction<boolean>) => {
            return { ...state, isWalletConnected: action.payload };
        },
        setBalances: (state, action: PayloadAction<any>) => {
            console.log('Action set balances', action.payload);
            return { ...state, balances: action.payload };
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
    setJsonFileUploadScreen,
    setPrefix,
    setLastVisitedTimestamp,
    setTokenImage,
    setQueryEndpoint,
    setWalletConnected,
    setBalances,
} = activeAccountSlice.actions;

export default activeAccountSlice.reducer;
