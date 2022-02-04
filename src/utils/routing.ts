import Views from '../components';

const { WelcomeBack, ImportWallet } = Views;

const UnAuthRoutes = [
    {
        path: '/welcomeBack',
        Component: WelcomeBack,
    },
    {
        path: '/ImportWallet',
        Component: ImportWallet,
    },
];

const AuthRoutes = [
    {
        path: '/welcomeBack',
        Component: WelcomeBack,
    },
];

export default { AuthRoutes, UnAuthRoutes };
