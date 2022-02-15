import Views from '../components';

const {
    WelcomeBack,
    ImportWallet,
    ShowSeed,
    ConfirmSeed,
    CreateWallet,
    Dashboard,
    MultipleAccounts,
    Support,
} = Views;

const UnAuthRoutes = [
    {
        path: '/welcomeBack',
        Component: WelcomeBack,
    },
    {
        path: '/ImportWallet',
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
        path: '/CreateWallet',
        Component: CreateWallet,
    },
];

const AuthRoutes = [
    {
        path: '/',
        Component: Dashboard,
    },
    {
        path: '/welcomeBack',
        Component: WelcomeBack,
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
        path: '/CreateWallet',
        Component: CreateWallet,
    },
    {
        path: '/Support',
        Component: Support,
    },
];

export default { AuthRoutes, UnAuthRoutes };
