export interface ImportLinkInterface {
    color?: string;
}

export interface AccountInterface {
    address: string;
    name?: string;
    err: boolean;
    errMessage: string;
    accountFromMetadot?: boolean;
}
export interface MultisigViewProps {
    accountList: AccountInterface[];
    onChangeAddress(index: number, value: string): void;
    addAccount(): void;
    onRemoveAccount(index: number): void;
    handleOpenModal(index: number): void;
    onSubmit(): void;
    threshold?: number;
    setThreshold(v1: number): void;
    name: string;
    setName(v1: string): void;
}

export interface AccountBoxProps {
    name: string;
    address: string;
}

export interface InputBoxProps {
    index: number;
    onChangeAddress(index: number, value: string): void;
    onRemoveAccount(index: number): void;
    handleOpenModal(index: number): void;
    address: string;
}
