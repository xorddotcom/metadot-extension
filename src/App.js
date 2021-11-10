import React from 'react';
import {
  MemoryRouter as Router, Switch, Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'react-loading-screen';

import { Slide, ToastContainer } from 'react-toastify';

import './App.css';

import PasswordScreen from './screens/PasswordScreen';
import { SuccessResponse } from './components';
import { setIsSuccessModalOpen } from './redux/slices/successModalHandling';
import ApiManager from './api';
import 'react-toastify/dist/ReactToastify.css';
import { routes } from './utils';

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
    if (!currentUser.account.isLoggedIn && currentUser.account.publicKey) {
      content = <PasswordScreen />;
    } else if (
      // prettier-ignore
      currentUser.account.isLoggedIn
      && currentUser.account.publicKey
    ) {
      content = (
        <div>
          <LoadingScreen
            loading={currentUser.api.apiInitializationStarts}
            bgColor="#121212"
            spinnerColor="#880041"
            textColor="#fafafa"
            text={currentUser.successModalHandling.loadingFor || 'Setting things up!'}
          >
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
          </LoadingScreen>
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

  return (
    <Router>
      <div className="App">
        <Switch>
          <div>
            {renderFunction()}

            {/* Dynamic Modal controlled by redux for successfully  executed processes
            overall the application */}
            <SuccessResponse
              open={isSuccessModalOpen}
              handleClose={() => dispatch(setIsSuccessModalOpen(false))}
              style={{
                width: '78%',
                background: '#141414',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                bottom: 40,
              }}
              subText={subText}
              mainText={mainText}
            />
            <ToastContainer
              position="top-center"
              autoClose={2500}
              hideProgressBar
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
              transition={Slide}
            />
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
