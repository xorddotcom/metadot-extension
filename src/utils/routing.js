// eslint-disable-next-line import/no-cycle
import screens from '../screens/index';

const {
  Welcome,
  ShowSeed,
  ConfirmSeed,
  ImportWallet,
  CreateWallet,
  Dashboard,
  Send,
  WelcomeBack,
  Support,
} = screens;

const UnAuthRoutes = [
  {
    path: '/',
    Component: Welcome,
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

];

export default { AuthRoutes, UnAuthRoutes };
