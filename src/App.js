import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ImportWallet from './screens/AuthScreens/ImportWallet';
import ShowSeed from './screens/AuthScreens/ShowSeed';

import CreateWallet from './screens/AuthScreens/CreateWallet';
import ConfirmSeed from './screens/AuthScreens/ConfirmSeed';

import './App.css';
import Dashboard from './screens/AppScreens/Dashboard';
import Send from './screens/AppScreens/Send';
import PasswordScreen from './screens/PasswordScreen';
import Welcome from './screens/AuthScreens/Welcome';
import { SuccessResponse } from './components';
import { setIsSuccessModalOpen } from './redux/slices/successModalHandling';
import ApiManager from './Api';
import constants from './constants/onchain';

function App() {
  // prettier-ignore
  const currentUser = useSelector((state) => state);
  const { isSuccessModalOpen, mainText, subText } = useSelector(
    (state) => state.successModalHandling,
  );

  console.log({ isSuccessModalOpen });

  const dispatch = useDispatch();

  console.log('Current user in app.js', currentUser);

  // const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(true);

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
          <ApiManager rpc={constants.Polkadot_Rpc_Url} />

          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/Send">
            <Send />
          </Route>
          <Route exact path="/createWallet">
            <CreateWallet />
          </Route>
        </div>
      );
    } else {
      content = (
        <div>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/PasswordScreen">
            <PasswordScreen />
          </Route>
          <Route path="/ShowSeed">
            <ShowSeed />
          </Route>
          <Route path="/ConfirmSeed">
            <ConfirmSeed />
          </Route>
          <Route path="/CreateWallet">
            <CreateWallet />
          </Route>
          <Route path="/ImportWallet">
            <ImportWallet />
          </Route>
          <Route path="/Send">
            <Send />
          </Route>
          {/* Temporary screen for testing */}
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
              }}
              subText={subText}
              mainText={mainText}
            />
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
