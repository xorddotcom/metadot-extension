import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import ImportWallet from './screens/ImportWallet';
import ShowSeed from './screens/ShowSeed';
import Welcome from './screens/Welcome';

import './App.css';
import CreateWallet from './screens/CreateWallet';
import ConfirmSeed from './screens/ConfirmSeed';

function App() {
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
        </Switch>
        {/* <Welcome /> */}
      </div>
    </Router>
  );
}

export default App;
