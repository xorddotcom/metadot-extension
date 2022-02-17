import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import type {
    AccountJson,
    AuthorizeRequest,
    MetadataRequest,
    SigningRequest,
} from 'metadot-extension-base/background/types';

import { QueryClientProvider, QueryClient } from 'react-query';
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
import {
    subscribeAccounts,
    subscribeAuthorizeRequests,
    subscribeMetadataRequests,
    subscribeSigningRequests,
} from './messaging';

function App(): JSX.Element {
    const [accounts, setAccounts] = useState<null | AccountJson[]>(null);
    const [authRequests, setAuthRequests] = useState<null | AuthorizeRequest[]>(
        null
    );
    const [metaRequests, setMetaRequests] = useState<null | MetadataRequest[]>(
        null
    );
    const [signRequests, setSignRequests] = useState<null | SigningRequest[]>(
        null
    );
    const { AuthRoutes, UnAuthRoutes } = routes;
    const { Welcome, WelcomeBack, PopupAuth, PopupSign, PopupMeta } = Views;
    const { activeAccount } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const queryClient = new QueryClient();

    useEffect(() => {
        Promise.all([
            subscribeAccounts(setAccounts),
            subscribeAuthorizeRequests(setAuthRequests),
            subscribeMetadataRequests(setMetaRequests),
            subscribeSigningRequests(setSignRequests),
        ]).catch(console.error);
    }, []);

    useEffect(() => {
        const saveAccountInRedux = ({
            name,
            address,
            parentAddress,
        }: any): void => {
            // setting active account
            dispatch(setLoggedIn(true));
            dispatch(setPublicKey(address));
            dispatch(setAccountName(name));

            // setting all accounts
            dispatch(
                addAccount({
                    accountName: name,
                    publicKey: address,
                    parentAddress,
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
        content = <Route path="/" element={<WelcomeBack />} />;
    } else if (activeAccount.isLoggedIn && activeAccount.publicKey) {
        if (authRequests && authRequests.length > 0) {
            content = (
                <Route
                    path="/"
                    element={<PopupAuth requests={authRequests} />}
                />
            );
        } else if (signRequests && signRequests.length > 0) {
            content = (
                <Route
                    path="/"
                    element={<PopupSign requests={signRequests} />}
                />
            );
        } else if (metaRequests && metaRequests.length > 0) {
            content = (
                <Route
                    path="/"
                    element={<PopupMeta requests={metaRequests} />}
                />
            );
        } else {
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
            <QueryClientProvider client={queryClient}>
                <ApiManager rpc={activeAccount.rpcUrl} />
                <Routes>{content}</Routes>
            </QueryClientProvider>
        </div>
    );
}

export default App;
