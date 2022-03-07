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

export interface TransformedAccountsInterface {
    [key: string]: TransformedAccountInterface;
}

export interface AccountListInterface {
    accounts: TransformedAccountsInterface;
    activateAccount(pk: string, name: string): void;
    deleteAccount(publicKey: string): Promise<void>;
    downloadJSON(address: string, password: string): Promise<boolean>;
    deriveAccount(address: string, password: string): Promise<boolean>;
    renameAccount(address: string, name: string): Promise<boolean>;
}

export interface AccountCardInterface {
    publicKey: string;
    accountName: string;
    parentAddress?: string;
    activateAccount(publicKey: string, name: string): void;
    openAccountDropDownHandler(
        e: any,
        publicKey: string,
        accountName: string,
        parentAddress?: string
    ): void;
    marginTop?: string;
}

export interface DerivedAccountsInterface {
    accounts: ChildAccountInterface[];
    activateAccount(pk: string, name: string): void;
    openAccountDropDownHandler(
        e: any,
        publicKey: string,
        accountName: string,
        parentAddress: string
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
    deleteAccount(value: string): void;
    setAuthModalFunction(value: string): void;
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
