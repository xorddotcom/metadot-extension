import screens from '../screens/index';

const {
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
  CreateDerivedAccount,
} = screens;

const UnAuthRoutes = [
  {
    path: '/ShowSeed',
    Component: ShowSeed,
  },
  {
    path: '/ConfirmSeed',
    Component: ConfirmSeed,
  },
  {
    path: '/ImportWallet',
    Component: ImportWallet,
  },
  {
    path: '/createWallet',
    Component: CreateWallet,
  },
  {
    path: '/welcomeBack',
    Component: WelcomeBack,
  },
];

const AuthRoutes = [
  {
    path: '/',
    Component: Dashboard,
  },
  {
    path: '/Send',
    Component: Send,
  },
  {
    path: '/welcomeBack',
    Component: WelcomeBack,
  },
  {
    path: '/Support',
    Component: Support,
  },
  {
    path: '/viewSeed',
    Component: ViewSeedPhrase,
  },
  {
    path: '/accounts',
    Component: MultipleAccounts,
  },
  {
    path: '/ImportWallet',
    Component: ImportWallet,
  },
  {
    path: '/ImportWallet/:seed',
    Component: ImportWallet,
  },
  {
    path: '/ShowSeed',
    Component: ShowSeed,
  },
  {
    path: '/ConfirmSeed',
    Component: ConfirmSeed,
  },
  {
    path: '/createWallet',
    Component: CreateWallet,
  },
  {
    path: '/creatDerivedAccount',
    Component: CreateDerivedAccount,
  },

];

export default { AuthRoutes, UnAuthRoutes };
