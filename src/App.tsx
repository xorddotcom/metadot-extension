import React from 'react';
import { useSelector } from 'react-redux';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { RootState } from './redux/store';
import './App.css';
import { routes } from './utils';
import Views from './components';

function App(): JSX.Element {
    const { AuthRoutes, UnAuthRoutes } = routes;
    const { Welcome, WelcomeBack } = Views;
    const { activeAccount } = useSelector((state: RootState) => state);
    const queryClient = new QueryClient();

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
                            <Route
                                key={path}
                                path={path}
                                element={<Component />}
                            />
                        );
                    })}
                </QueryClientProvider>
            </div>
        );
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
            <Routes>{content}</Routes>
        </div>
    );
}

export default App;
