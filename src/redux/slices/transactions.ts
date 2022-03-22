import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionRecord, Transaction, Transactions } from '../types';

const initialState: Transactions = {};

export const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (
            state,
            action: PayloadAction<{
                transactions: TransactionRecord[];
                publicKey: string;
            }>
        ) => {
            const newTransactions: any = {};
            action.payload.transactions.forEach((transaction) => {
                newTransactions[transaction.hash] = {
                    accountFrom: transaction.accountFrom,
                    accountTo: transaction.accountTo,
                    amount: transaction.amount,
                    hash: transaction.hash,
                    operation: transaction.operation,
                    status: transaction.status,
                    chainName: transaction.chainName,
                    tokenName: transaction.tokenName,
                    transactionFee: transaction.transactionFee,
                    timestamp: transaction.timestamp,
                };
            });

            return {
                ...state,
                [action.payload.publicKey]: {
                    ...state[action.payload.publicKey],
                    ...newTransactions,
                },
            };
        },
    },
});

export const { addTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
