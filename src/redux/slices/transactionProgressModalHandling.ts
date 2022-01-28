import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    transactionProgressMainText: 'Transaction in Progress',
    transactionProgressSubText: 'The process is in progress!',
    isTransactionProgressModalOpen: false,
};

export const transactionProgressModalHandling = createSlice({
    name: 'transactionProgressModalHandling',
    initialState,
    reducers: {
        setMainTextForTransactionProgressModal: (
            state,
            action: PayloadAction<string>
        ) => {
            return { ...state, transactionProgressMainText: action.payload };
        },
        setSubTextForTransactionProgressModal: (
            state,
            action: PayloadAction<string>
        ) => {
            return { ...state, transactionProgressSubText: action.payload };
        },
        setIsTransactionProgressModalOpen: (
            state,
            action: PayloadAction<boolean>
        ) => {
            return { ...state, isTransactionProgressModalOpen: action.payload };
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setMainTextForTransactionProgressModal,
    setSubTextForTransactionProgressModal,
    setIsTransactionProgressModalOpen,
} = transactionProgressModalHandling.actions;

export default transactionProgressModalHandling.reducer;
