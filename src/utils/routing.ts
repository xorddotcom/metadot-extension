import Views from '../components';

const { WelcomeBack, ImportWallet, ShowSeed, ConfirmSeed, CreateWallet } =
    Views;

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
        path: '/welcomeBack',
        Component: WelcomeBack,
    },
];

export default { AuthRoutes, UnAuthRoutes };
