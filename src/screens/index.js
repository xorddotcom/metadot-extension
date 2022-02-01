/* eslint-disable import/no-cycle */
import Dashboard from './AppScreens/Dashboard';
import Send from './AppScreens/Send';

import ConfirmSeed from './AuthScreens/ConfirmSeed';
import CreateWallet from './AuthScreens/CreateWallet';
import ImportWallet from './AuthScreens/ImportWallet';
import ShowSeed from './AuthScreens/ShowSeed';
import Welcome from './AuthScreens/Welcome';

const screens = {
  Welcome,
  ShowSeed,
  ConfirmSeed,
  ImportWallet,
  CreateWallet,
  Dashboard,
  Send,
};

export default screens;
