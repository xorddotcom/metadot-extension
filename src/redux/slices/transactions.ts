import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types';

const initialState: Transaction[] = [];

export const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            const newState = state.concat(action.payload);
            return newState;
        },
        resetTransactions: () => {
            return [];
        },
    },
});

export const { addTransaction, resetTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
