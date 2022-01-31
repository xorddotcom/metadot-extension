import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import './App.css';

import { Welcome, WelcomeBack } from './components';
import { routes } from './utils';

function App(): JSX.Element {
    const { activeAccount } = useSelector((state: RootState) => state);
    const queryClient = new QueryClient();
    const { AuthRoutes, UnAuthRoutes } = routes;

    let content;
    if (!activeAccount.isLoggedIn && activeAccount.publicKey) {
        content = <WelcomeBack />;
    } else if (activeAccount.isLoggedIn && activeAccount.publicKey) {
        content = (
            <div>
                <QueryClientProvider client={queryClient}>
                    {AuthRoutes.map((route) => {
                        const { path, Component } = route;
                        return (
                            <Route path={path} key={path}>
                                <Component />
                            </Route>
                        );
                    })}
                </QueryClientProvider>
            </div>
        );
    } else {
        content = (
            <>
                <Route path="/">
                    <Welcome />
                </Route>
                {UnAuthRoutes.map((route) => {
                    const { path, Component } = route;
                    return (
                        <Route path={path} key={path}>
                            <Component />
                        </Route>
                    );
                })}
            </>
        );
    }

    return (
        <Router>
            <div className="App">
                <Routes>{content}</Routes>
            </div>
        </Router>
    );
}

export default App;
