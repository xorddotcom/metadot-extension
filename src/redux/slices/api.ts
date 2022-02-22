import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';

interface initialStateInterface {
    api: ApiPromiseType | string;
    apiInitializationStarts: boolean;
    apiInitializationEnds: boolean;
    apiInitializationCompleted: boolean;
}
const initialState: initialStateInterface = {
    api: '',
    apiInitializationStarts: false,
    apiInitializationEnds: false,
    apiInitializationCompleted: false,
};

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setApi: (state, action: PayloadAction<ApiPromiseType>) => {
            return {
                api: action.payload,
                apiInitializationCompleted: true,
                apiInitializationEnds: true,
                apiInitializationStarts: false,
            };
        },
        setApiInitializationStarts: (state, action: PayloadAction<boolean>) => {
            return { ...state, apiInitializationStarts: action.payload };
        },
        setApiInitializationEnds: (state, action: PayloadAction<boolean>) => {
            return { ...state, apiInitializationEnds: action.payload };
        },
        deleteApi: (state) => {
            return { ...state, api: '' };
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setApi,
    deleteApi,
    setApiInitializationEnds,
    setApiInitializationStarts,
} = apiSlice.actions;

export default apiSlice.reducer;
