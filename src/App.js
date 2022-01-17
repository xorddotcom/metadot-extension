/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  MemoryRouter as Router, Switch, Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import keyring from '@polkadot/ui-keyring';

import './App.css';

import { QueryClientProvider, QueryClient } from 'react-query';
import { ResponseModal, TransactionProgress } from './components';
import { setIsResponseModalOpen } from './redux/slices/modalHandling';
import { setIsTransactionProgressModalOpen } from './redux/slices/transctionProgressModalHandling';
import ApiManager from './apiManager';
import { routes } from './utils';
import accounts from './utils/accounts';
import WelcomeBack from './screens/unAuthorized/welcomeBack';
import Welcome from './screens/unAuthorized/welcome';
import chainConfigs from './constants/onchain';

const { AuthRoutes, UnAuthRoutes } = routes;
const { KeyringInitialization } = accounts;
const { WESTEND_CONFIG } = chainConfigs;

function App() {
  // prettier-ignore
  const currentUser = useSelector((state) => state);
  const {
    isResponseModalOpen, mainText, subText, responseImage,
  } = useSelector(
    (state) => state.modalHandling,
  );

  const {
    isTransactionProgressModalOpen,
    transactionProgressMainText,
    transactionProgressSubText,
  } = useSelector(
    (state) => state.transactionProgressModalHandling,
  );

  const { publicKey } = currentUser.activeAccount;

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (publicKey) {
        const abc = keyring.getPair(publicKey);
        console.log('----keyring.getPair', abc);
      }
    } catch (err) {
      KeyringInitialization();
      console.log(err);
    }
  }, [publicKey]);
  const queryClient = new QueryClient();

  const renderFunction = () => {
    let content;

    if (
      !currentUser.activeAccount.isLoggedIn
      && currentUser.activeAccount.publicKey
    ) {
      content = <WelcomeBack />;
    } else if (
      // prettier-ignore
      currentUser.activeAccount.isLoggedIn
      && currentUser.activeAccount.publicKey
    ) {
      content = (
        <div>
          <QueryClientProvider client={queryClient}>
            <ApiManager rpc={WESTEND_CONFIG.RPC_URL} />

            {
                 AuthRoutes.map((route) => {
                   const { path, Component } = route;
                   return (
                     <Route exact path={path} key={path}>
                       <Component />
                     </Route>
                   );
                 })
            }
          </QueryClientProvider>
        </div>
      );
    } else {
      content = (
        <>
          <Route exact path="/">
            <Welcome />
          </Route>
          {
              UnAuthRoutes.map((route) => {
                const { path, Component } = route;
                return (
                  <Route path={path} key={path}>
                    <Component />
                  </Route>
                );
              })
            }
        </>
      );
    }
    return content;
  };

  const responseModalStyle = {
    width: '78%',
    background: '#141414',
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: 40,
    zIndex: 10000,
  };

  const responseModal = {
    open: isResponseModalOpen,
    handleClose: () => dispatch(setIsResponseModalOpen(false)),
    style: responseModalStyle,
    subText,
    mainText,
    responseImage,
  };

  const transactionProgress = {
    open: isTransactionProgressModalOpen,
    handleClose: () => dispatch(setIsTransactionProgressModalOpen(false)),
    style: responseModalStyle,
    transactionProgressMainText,
    transactionProgressSubText,
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <div>
            {renderFunction()}

            {/* Dynamic Modal controlled by redux for successfully and
            unsuccessfully  executed processes
            overall the application */}
            <ResponseModal {...responseModal} />
            <TransactionProgress {...transactionProgress} />
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
