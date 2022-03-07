import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AccountJson } from 'metadot-extension-base/background/types';
import { Account, Accounts } from '../types';

const initialState: Accounts = {
    '5Dz1i42ygyhi4BxPnvKtRY4TBShTMC9T2FvaMB8CWxoU3QgG': {
        publicKey: '5Dz1i42ygyhi4BxPnvKtRY4TBShTMC9T2FvaMB8CWxoU3QgG',
        accountName: 'Hello',
    },
};

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<Account>) => {
            return {
                ...state,
                [action.payload.publicKey]: action.payload,
            };
        },

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
    },
});

export const { addAccount, deleteAccount, updateAccounts } =
    accountsSlice.actions;

export default accountsSlice.reducer;
