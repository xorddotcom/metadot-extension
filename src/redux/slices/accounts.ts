import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AccountJson } from 'metadot-extension-base/background/types';
import { Accounts } from '../types';

const initialState: Accounts = {
    '25YL8fvdvwCH1upevE8htVEpcLEDeuKfb4PYq868qynR5pwa': {
        publicKey: '25YL8fvdvwCH1upevE8htVEpcLEDeuKfb4PYq868qynR5pwa',
        accountName: 'Hello',
    },
};

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        // addAccount: (state, action: PayloadAction<Account>) => {
        //     return {
        //         ...state,
        //         [action.payload.publicKey]: action.payload,
        //     };
        // },

        deleteAccount: (state, action: PayloadAction<string>) => {
            const copyState = { ...state };
            delete copyState[action.payload as keyof Accounts];
            return copyState;
        },
        updateAccounts: (state, action: PayloadAction<AccountJson[]>) => {
            console.log('action payload', action.payload);
            const newState: any = {};

            action.payload.forEach((account: any) => {
                newState[account.address] = {
                    publicKey: account.address,
                    accountName: account.name,
                    parentAddress: account.parentAddress
                        ? account.parentAddress
                        : null,
                };
            });
            console.log('new state', newState);
            return newState;
        },

        resetAccountsSlice: (state) => {
            return {};
        },
    },
});

export const { updateAccounts, resetAccountsSlice } = accountsSlice.actions;

export default accountsSlice.reducer;
