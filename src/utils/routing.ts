import Views from '../components';

const { Welcome } = Views;

const UnAuthRoutes = [
    {
        path: '/',
        Component: Welcome,
    },
];

const AuthRoutes = [
    {
        path: '/',
        Component: Welcome,
    },
];

export default { AuthRoutes, UnAuthRoutes };
