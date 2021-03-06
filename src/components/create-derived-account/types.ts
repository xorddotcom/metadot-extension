export interface ParentMetaDataInterface {
    address: string;
    accountName: string;
    derivePath: string;
    setDerivePath(value: string): void;
    password: string;
    setPassword(value: string): void;
    validateAccount(address: string, password: string): Promise<boolean>;
    derivePathValidation(
        address: string,
        derivePath: string,
        password: string
    ): Promise<{ address: string; suri: string }>;
    isLoading: boolean;
    setIsLoading(value: boolean): void;
    setStep(value: number): void;
    setDeriveAddress(value: string): void;
}

export interface ChildMetaDataInterface {
    parentAddress: string;
    derivePath: string;
    parentPassword: string;
    isLoading: boolean;
    setIsLoading(value: boolean): void;
    derive(
        parentAddress: string,
        derivePath: string,
        parentPassword: string,
        walletName: string,
        password: string,
        value: null
    ): Promise<boolean>;
    deriveAddress: string;
    showSuccess(): void;
}
