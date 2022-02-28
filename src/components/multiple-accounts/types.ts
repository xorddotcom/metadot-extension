export interface ParentAccountInterface {
    publicKey: string;
    accountName: string;
    parentAddress?: string;
}

export interface ChildAccountInterface {
    publicKey: string;
    accountName: string;
    parentAddress: string;
}

export interface TransformedAccountInterface {
    publicKey: string;
    accountName: string;
    parentAddress?: string;
    childAccounts: ChildAccountInterface[];
}

export interface AccountListInterface {
    accounts: TransformedAccountInterface[];
    activateAccount(pk: string, name: string): void;
    deleteAccount(publicKey: string): Promise<void>;
    downloadJSON(address: string, password: string): Promise<void>;
}

export interface DerivedAccountsInterface {
    accounts: ChildAccountInterface[];
    activateAccount(pk: string, name: string): void;
    openAccountDropDownHandler(
        e: any,
        publicKey: string,
        accountName: string
    ): void;
}

export interface AccountCardInterface {
    publicKey: string;
    accountName: string;
    activateAccount(publicKey: string, name: string): void;
    openAccountDropDownHandler(
        e: any,
        publicKey: string,
        accountName: string
    ): void;
}

export interface MainTextInterface {
    fs?: string;
    lh?: string;
    ls?: string;
    color?: string;
    mb?: string;
    m?: string;
    mt?: string;
    className?: string;
}

export interface DeriveModalInterface {
    open: boolean;
    handleClose(): void;
    style: object;
    publicKey: string;
}

export interface AccountDropDownInterface {
    open: boolean;
    handleClose(): void;
    anchorEl: Element;
    account: ParentAccountInterface;
    expandModal(account: ParentAccountInterface): void;
    deleteAccount(value: string): void;
    isThisAParent: boolean;
}

export interface ChildAccountDropDownInterface {
    open: boolean;
    handleClose(): void;
    anchorEl: Element;
    publicKeyy: string;
    onOptionClicked(): void;
    key: string;
}

export interface DerivedAccountInterface {
    childAccount: { publicKey: string; accountName: string };
    childAccountActive(v1: string, v2: string): void;
    checkDrivedDropdownOpen(value: boolean): void;
}

export interface SelfDrivedAccountListInterface {
    childAccount: { publicKey: string; accountName: string };
    childAccountActive(): void;
}
