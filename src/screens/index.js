import Dashboard from './authorized/dashboard';
import Send from './authorized/send';
import Support from './authorized/support';
import ViewSeedPhrase from './authorized/viewSeedPhrase';
import MultipleAccounts from './authorized/multipleAccounts/index';

import ConfirmSeed from './unAuthorized/confirmSeed';
import CreateWallet from './unAuthorized/createWallet';
import ImportWallet from './unAuthorized/importWallet';
import ShowSeed from './unAuthorized/showSeed';
import Welcome from './unAuthorized/welcome';
import WelcomeBack from './unAuthorized/welcomeBack';

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
  ViewSeedPhrase,
  MultipleAccounts,
};

export default screens;
