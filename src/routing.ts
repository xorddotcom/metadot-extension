import Views from './components';

import {
    ACCOUNTS,
    CONFIRM_SEED,
    CREATE_DERIVED_ACCOUNT,
    CREATE_WALLET,
    DASHBOARD,
    IMPORT_WALLET,
    SEND,
    SHOW_SEED,
    SUPPORT,
    WELCOME_BACK,
} from './constants';

const {
    WelcomeBack,
    ImportWallet,
    ShowSeed,
    ConfirmSeed,
    CreateWallet,
    Dashboard,
    MultipleAccounts,
    ManageAccess,
    Support,
    CreateDerivedAccount,
    Send,
} = Views;

export const UnAuthorizedRoutes = [
    {
        path: WELCOME_BACK,
        Component: WelcomeBack,
    },
    {
        path: IMPORT_WALLET,
        Component: ImportWallet,
    },
    {
        path: SHOW_SEED,
        Component: ShowSeed,
    },
    {
        path: CONFIRM_SEED,
        Component: ConfirmSeed,
    },
    {
        path: CREATE_WALLET,
        Component: CreateWallet,
    },
];

export const AuthorizedRoutes = [
    {
        path: DASHBOARD,
        Component: Dashboard,
    },
    {
        path: SEND,
        Component: Send,
    },
    {
        path: WELCOME_BACK,
        Component: WelcomeBack,
    },
    {
        path: ACCOUNTS,
        Component: MultipleAccounts,
    },
    { path: '/manageAccess', Component: ManageAccess },
    {
        path: IMPORT_WALLET,
        Component: ImportWallet,
    },
    {
        path: CREATE_WALLET,
        Component: CreateWallet,
    },
    {
        path: SUPPORT,
        Component: Support,
    },
    {
        path: CREATE_DERIVED_ACCOUNT,
        Component: CreateDerivedAccount,
    },
    {
        path: SHOW_SEED,
        Component: ShowSeed,
    },
    {
        path: CONFIRM_SEED,
        Component: ConfirmSeed,
    },
];
