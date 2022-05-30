import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import store, { persistor } from './redux/store';
import App from './App';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <HashRouter>
                    <Routes>
                        <Route path="*" element={<App />} />
                    </Routes>
                </HashRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
