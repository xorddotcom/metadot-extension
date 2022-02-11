import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AccountJson } from 'metadot-extension-base/background/types';
import {
    setLoggedIn,
    setPublicKey,
    setAccountName,
} from './redux/slices/activeAccount';
import { addAccount } from './redux/slices/accounts';
import { RootState } from './redux/store';
import './App.css';
import ApiManager from './components/api-manager';
import { routes } from './utils';
import Views from './components';
import { subscribeAccounts } from './messaging';

function App(): JSX.Element {
    const [accounts, setAccounts] = useState<null | AccountJson[]>(null);
    const { AuthRoutes, UnAuthRoutes } = routes;
    const { Welcome, WelcomeBack } = Views;
    const { activeAccount } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        subscribeAccounts(setAccounts);
    }, []);

    useEffect(() => {
        const saveAccountInRedux = ({ name, address }: any): void => {
            // setting active account
            dispatch(setLoggedIn(true));
            dispatch(setPublicKey(address));
            dispatch(setAccountName(name));

            // setting all accounts
            dispatch(
                addAccount({
                    accountName: name,
                    publicKey: address,
                })
            );
        };

        if (accounts && accounts.length > 0) {
            saveAccountInRedux(accounts[accounts.length - 1]);
        }
        console.log('accounts ==>>', accounts);
    }, [accounts]);

    let content;
    if (!activeAccount.isLoggedIn && activeAccount.publicKey) {
        content = <WelcomeBack />;
    } else if (activeAccount.isLoggedIn && activeAccount.publicKey) {
        try {
            content = (
                <>
                    {AuthRoutes.map((route) => {
                        const { path, Component } = route;
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={<Component />}
                            />
                        );
                    })}
                </>
            );
        } catch (error) {
            console.log('error in app.js', error);
        }
    } else {
        content = (
            <>
                <Route path="/" element={<Welcome />} />;
                {UnAuthRoutes.map((route) => {
                    const { path, Component } = route;
                    return (
                        <Route key={path} path={path} element={<Component />} />
                    );
                })}
            </>
        );
    }

    return (
        <div className="App">
            <ApiManager rpc={activeAccount.rpcUrl} />
            <Routes>{content}</Routes>
        </div>
    );
}

export default App;
