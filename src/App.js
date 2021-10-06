import React, { useEffect } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import ImportWallet from './screens/AuthScreens/ImportWallet';
import ShowSeed from './screens/AuthScreens/ShowSeed';
import Welcome from './screens/AuthScreens/Welcome';

import CreateWallet from './screens/AuthScreens/CreateWallet';
import ConfirmSeed from './screens/AuthScreens/ConfirmSeed';

import './App.css';
import Dashboard from './screens/AppScreens/Dashboard';
import Send from './screens/AppScreens/Send';

function App() {
  //commenting temporarily due to the issue in browser api "undefined"
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

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Welcome />
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

          {/* Temporary screen for testing */}
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/Send">
            <Send />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
