import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AccountJson } from 'metadot-extension-base/background/types';
import services from '../../utils/services';
import { Accounts } from '../types';

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
                };
            });
            return newState;
        },
        resetAccountsSlice: (state) => {
            return {};
        },
    },
});

export const { updateAccounts, resetAccountsSlice } = accountsSlice.actions;

export default accountsSlice.reducer;
