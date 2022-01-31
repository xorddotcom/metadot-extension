import { WelcomeBack, Dashboard } from '../components';

const UnAuthRoutes = [
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
        path: '/welcomeBack',
        Component: WelcomeBack,
    },
];

export default { AuthRoutes, UnAuthRoutes };
