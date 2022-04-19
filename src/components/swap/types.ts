export interface CircleProps {
    color: string;
}

export interface Token {
    name: string;
    balance: string;
    isNative: boolean;
    decimal: number;
}

export interface SwapViewProps {
    handleOpen(tokenType: string): void;
    tokenFrom?: Token;
    tokenTo?: Token;
    tokenImage: string;
    amountFrom: string;
    handleAmountChange(value: string): void;
    swapClickHandler(): void;
}
