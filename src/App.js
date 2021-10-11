import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ImportWallet from './screens/AuthScreens/ImportWallet';
import ShowSeed from './screens/AuthScreens/ShowSeed';

import CreateWallet from './screens/AuthScreens/CreateWallet';
import ConfirmSeed from './screens/AuthScreens/ConfirmSeed';

import './App.css';
import Dashboard from './screens/AppScreens/Dashboard';
import Send from './screens/AppScreens/Send';
import PasswordScreen from './screens/PasswordScreen';
import Welcome from './screens/AuthScreens/Welcome';

function App() {
  // prettier-ignore
  const currentUser = useSelector((state) => state);
  console.log('Current user in app.js', currentUser);

  // useEffect(() => {
  //   console.log("Use effect running");
  //   <Redirect to="/PasswordScreen" />;
  //   return <PasswordScreen />;
  // });

  // commenting temporarily due to the issue in browser api "undefined"
  // useEffect(() => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     chrome.tabs.sendMessage(
  //       tabs[0].id,
  //       { greeting: 'hello' },
  //       function (response) {
  //         console.log(response.farewell);
  //       },
  //     );
  //   });
  // }, []);

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
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/Send">
            <Send />
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
            {
              // if(!currentUser.account.isLoggedIn &&
              // currentUser.account.publicKey) {
              //   <PasswordScreen />
              // } else {
              //   if (currentUser.account.isLoggedIn &&
              //   currentUser.account.publicKey) {
              //   <div>
              //     <Route exact path="/">
              //       <Dashboard />
              //     </Route>
              //     <Route path="/Send">
              //       <Send />
              //     </Route>
              //   </div>
              // } else{
              //   <div>
              //     <Route exact path="/">
              //       <Welcome />
              //     </Route>
              //     <Route path="/PasswordScreen">
              //       <PasswordScreen />
              //     </Route>
              //     <Route path="/ShowSeed">
              //       <ShowSeed />
              //     </Route>
              //     <Route path="/ConfirmSeed">
              //       <ConfirmSeed />
              //     </Route>
              //     <Route path="/CreateWallet">
              //       <CreateWallet />
              //     </Route>
              //     <Route path="/ImportWallet">
              //       <ImportWallet />
              //     </Route>
              //     <Route path="/Send">
              //       <Send />
              //     </Route>
              //     {/* Temporary screen for testing */}
              //   </div>
              // }}
            }
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
