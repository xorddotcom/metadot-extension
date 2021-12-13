/* eslint-disable no-unused-vars */
import React from 'react';
import {
  MemoryRouter as Router, Switch, Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import { ResponseModal, TransactionProgress } from './components';
import { setIsResponseModalOpen } from './redux/slices/modalHandling';
import { setIsTransactionProgressModalOpen } from './redux/slices/transctionProgressModalHandling';
import ApiManager from './apiManager';
import { routes } from './utils';
import WelcomeBack from './screens/unAuthorized/welcomeBack';

const { AuthRoutes, UnAuthRoutes } = routes;

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

  const dispatch = useDispatch();

  const renderFunction = () => {
    let content;

    if (!currentUser.account.isLoggedIn && currentUser.account.publicKey) {
      content = <WelcomeBack />;
    } else if (
      // prettier-ignore
      currentUser.account.isLoggedIn
      && currentUser.account.publicKey
    ) {
      content = (
        <div>
          <ApiManager rpc={currentUser.account.rpcUrl} />

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
        </div>
      );
    } else {
      content = (
        <div>
          {
              UnAuthRoutes.map((route) => {
                const { path, Component } = route;
                return (
                  <Route exact path={path} key={path}>
                    <Component />
                  </Route>
                );
              })
            }
        </div>
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
