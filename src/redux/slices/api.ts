import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiTypes } from '@polkadot/api/types';

const api: ApiTypes | string = '';

const initialState = {
    api,
    apiInitializationStarts: false,
    apiInitializationEnds: false,
    apiInitializationCompleted: false,
};

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setApi: (state, action: PayloadAction<ApiTypes>) => {
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
