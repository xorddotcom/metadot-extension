import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AccountJson } from 'metadot-extension-base/background/types';
import services from '../../utils/services';
import { Accounts } from '../types';

const initialState: Accounts = {};

const { addressMapper } = services;

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
            console.log('action payload', action.payload);
            const newState: any = {};

            action.payload.allAccounts.forEach((account: any) => {
                const publicKeyOfRespectiveChain = addressMapper(
                    account.address,
                    0
                );

                newState[publicKeyOfRespectiveChain] = {
                    publicKey: publicKeyOfRespectiveChain,
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
