export interface Account {
    publicKey: string;
    accountName: string;
    parentAddress?: string;
}

export interface FromInputProps {
    resetToggles?(e: boolean): void;
}
