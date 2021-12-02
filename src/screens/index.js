/* eslint-disable import/no-cycle */
import Dashboard from './AppScreens/Dashboard';
import Send from './AppScreens/Send';
import Support from './AppScreens/SupportScreen';

import ConfirmSeed from './AuthScreens/ConfirmSeed';
import CreateWallet from './AuthScreens/CreateWallet';
import ImportWallet from './AuthScreens/ImportWallet';
import ShowSeed from './AuthScreens/ShowSeed';
import Welcome from './AuthScreens/Welcome';
import WelcomeBack from './AuthScreens/WelcomeBack';

const screens = {
  Welcome,
  ShowSeed,
  ConfirmSeed,
  ImportWallet,
  CreateWallet,
  Dashboard,
  Send,
  WelcomeBack,
  Support,
};

export default screens;
