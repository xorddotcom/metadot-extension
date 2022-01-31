import { WelcomeBack } from '../components';

const UnAuthRoutes = [
    {
        path: '/welcomeBack',
        Component: WelcomeBack,
    },
];

const AuthRoutes = [
    {
        path: '/welcomeBack',
        Component: WelcomeBack,
    },
];

export default { AuthRoutes, UnAuthRoutes };
