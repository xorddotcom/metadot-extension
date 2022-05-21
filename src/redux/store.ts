import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import { persistReducer, persistStore } from 'redux-persist';

// import logger from 'redux-logger';
import { rootReducer } from './slices';

const persistConfig = {
    blacklist: ['modalHandling'],
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;
