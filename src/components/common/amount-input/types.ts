export interface errorMessages {
    invalidAddress?: string;
    enterAddress?: string;
    enterAmount?: string;
    sameAddressError?: string;
}

export interface AmountInputInterface {
    onChange(e: string): void;
    insufficientBal: boolean;
    transactionFee: number;
    amount: any;
    tokenName: string;
    balance: number;
    dollarAmount?: string;
}

export interface CalculatedAmountInterface {
    marginTop?: string;
}
