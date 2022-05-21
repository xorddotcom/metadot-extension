export interface CircleProps {
    color: string;
}

export interface Token {
    name: string;
    balance: string;
    isNative: boolean;
    decimal: number;
    image?: string;
}

export interface SwapViewProps {
    handleOpen(tokenType: string): void;
    tokenFrom?: Token;
    tokenTo?: Token;
    tokenImage: string;
    amountFrom: string;
    swapParams: any;
    handleCurrencySwitch(): void;
    handleAmountChange(value: string): void;
    handleMaxClicked(): void;
    swapClickHandler(): void;
    insufficientBalance: boolean;
    isLoading: boolean;
}
