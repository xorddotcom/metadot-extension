import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import constants from '../../constants/onchain';
import { ActiveAccount } from '../types';

const { POLKADOT_CONFIG } = constants;

const initialState: ActiveAccount = {
    isLoggedIn: true,
    publicKey: '5GjSQRFYEFBY1nmVuGHTyKkRHrodQmUKdA7kWzfmfLp262xG',
    accountName: 'Hello 1',
    rpcUrl: POLKADOT_CONFIG.rpcUrl,
    chainName: POLKADOT_CONFIG.name,
    tokenName: POLKADOT_CONFIG.tokenName,
    tokenImage: POLKADOT_CONFIG.logo,
    balance: 0,
    balanceInUsd: 0,
    jsonFileUploadScreen: false,
    prefix: 0,
    lastVisitedTimestamp: '',
    queryEndpoint: POLKADOT_CONFIG.queryEndpoint,
    isWalletConnected: false,
    balances: [
        {
            name: '',
            balance: 0,
            isNative: false,
            decimal: 0,
            tokenImage: POLKADOT_CONFIG.logo,
        },
    ],
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
            return { ...initialState };
        },
        setPublicKey: (state, action: PayloadAction<string>) => {
            console.log('set public key working ---->>>');
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
            return { ...state, balances: action.payload };
        },
        updateBalance: (state, action: PayloadAction<any>) => {
            const currBalances = action.payload.balances;
            const { token, updBalance } = action.payload;
            const updatingLiveBalance = currBalances.map((balance: any) => {
                if (token === balance.name) {
                    return { ...balance, balance: updBalance };
                }
                return balance;
            });
            return { ...state, balances: updatingLiveBalance };
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
    updateBalance,
} = activeAccountSlice.actions;

export default activeAccountSlice.reducer;
