import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import constants from '../../constants/onchain';

const { WESTEND_CONFIG } = constants;

const initialState = {
    isLoggedIn: true,
    // publicKey: '5GjSQRFYEFBY1nmVuGHTyKkRHrodQmUKdA7kWzfmfLp262xG',
    // accountName: 'Hello',
    publicKey: '',
    accountName: '',
    rpcUrl: WESTEND_CONFIG.rpcUrl,
    chainName: WESTEND_CONFIG.name,
    tokenName: WESTEND_CONFIG.tokenName,
    tokenImage: WESTEND_CONFIG.logo,
    balance: 0,
    balanceInUsd: 0,
    jsonFileUploadScreen: false,
    prefix: 42,
    accountCreationStep: 0,
    tempSeed: '',
    lastVisitedTimestamp: '',
    queryEndpoint: WESTEND_CONFIG.queryEndpoint,
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
        setAccountCreationStep: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                accountCreationStep: action.payload,
            };
        },
        setTempSeed: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                tempSeed: action.payload,
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
                balanceInUsd: 0,
                jsonFileUploadScreen: false,
                rpcUrl: WESTEND_CONFIG.rpcUrl,
                chainName: WESTEND_CONFIG.name,
                tokenName: WESTEND_CONFIG.tokenName,
                tokenImage: WESTEND_CONFIG.logo,
                queryEndpoint: WESTEND_CONFIG.queryEndpoint,
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
    setAccountCreationStep,
    setTempSeed,
    setLastVisitedTimestamp,
    setTokenImage,
    setQueryEndpoint,
} = activeAccountSlice.actions;

export default activeAccountSlice.reducer;
