export interface AccountListInterface {
    publicKey?: string;
    accountName: string;
    marginBottom?: string;
    marginTop?: string;
    accountActive?(): void;
    publicKeyy: string;
    account: { publicKey: string; accountName: string; parentAddress: string };
    childAccounts?: {
        publicKey: string;
        accountName: string;
        parentAddress: string;
    }[];
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
    account: { parentAddress: string };
    expandModal(value: { parentAddress: string }): void;
    publicKey: string;
    publicKeyy: string;
    onOptionClicked(): void;
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
    childAccountActive(): void;
    checkDrivedDropdownOpen(value: boolean): void;
}

export interface SelfDrivedAccountListInterface {
    childAccount: { publicKey: string; accountName: string };
    childAccountActive(): void;
}
