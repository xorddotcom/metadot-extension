/* eslint-disable no-unused-vars */
import React from 'react';
import {
  MemoryRouter as Router, Switch, Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Slide, ToastContainer } from 'react-toastify';

import './App.css';

import { SuccessResponse } from './components';
import { setIsSuccessModalOpen } from './redux/slices/successModalHandling';
import ApiManager from './api';
import 'react-toastify/dist/ReactToastify.css';
import { routes } from './utils';
import WelcomeBack from './screens/AuthScreens/WelcomeBack';

const { AuthRoutes, UnAuthRoutes } = routes;

function App() {
  // prettier-ignore
  const currentUser = useSelector((state) => state);
  const { isSuccessModalOpen, mainText, subText } = useSelector(
    (state) => state.successModalHandling,
  );

  const dispatch = useDispatch();

  const renderFunction = () => {
    let content;
    const loadingScreen = {
      loading: currentUser.api.apiInitializationStarts,
      bgColor: '#121212',
      spinnerColor: '#2E9B9B',
      textColor: '#fafafa',
      text: currentUser.successModalHandling.loadingFor || 'Setting things up!',
    };
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

  const successResponseInlineStyle = {
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

  const successResponse = {
    open: isSuccessModalOpen,
    handleClose: () => dispatch(setIsSuccessModalOpen(false)),
    style: successResponseInlineStyle,
    subText,
    mainText,
  };

  const toastContainer = {
    position: 'top-center',
    autoClose: 2500,
    newestOnTop: false,
    closeOnClick: false,
    rtl: false,
    draggable: false,
    transition: Slide,
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <div>
            {renderFunction()}

            {/* Dynamic Modal controlled by redux for successfully  executed processes
            overall the application */}
            <SuccessResponse {...successResponse} />
            <ToastContainer
              {...toastContainer}
              hideProgressBar
              pauseOnFocusLoss
              pauseOnHover
            />
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
