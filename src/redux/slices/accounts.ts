import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AccountJson } from 'metadot-extension-base/background/types';
import { Accounts } from '../types';

const initialState: Accounts = {};

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        updateAccounts: (
            state,
            action: PayloadAction<{
                allAccounts: AccountJson[];
                prefix: number;
            }>
        ) => {
            const newState: any = {};

            action.payload.allAccounts.forEach((account: any) => {
                newState[account.address] = {
                    publicKey: account.address,
                    accountName: account.name,
                    parentAddress: account.parentAddress
                        ? account.parentAddress
                        : null,
                    multisig: false,
                };
            });
            console.log('state before newState', { ...state, ...newState });
            return { ...state, ...newState };
        },

        addAccount: (state, action: PayloadAction<any>) => {
            const newState: any = {};

            action.payload.forEach((account: any) => {
                newState[account.publicKey] = account;
                // {
                //     publicKey: account.address,
                //     accountName: account.name,
                //     parentAddress: account.parentAddress
                //         ? account.parentAddress
                //         : null,
                //     multisig: false,
                // };
            });
            return newState;
        },

        resetAccountsSlice: (state) => {
            return {};
        },
    },
});

export const { updateAccounts, resetAccountsSlice, addAccount } =
    accountsSlice.actions;

export default accountsSlice.reducer;
