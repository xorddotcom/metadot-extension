import { RootState } from '../../redux/store';

export interface FromInputInterface {
    addressModifier(publicKey: string): string | undefined;
    accountName: string;
    publicKey: string;
}

export interface errorMessages {
    invalidAddress?: string;
    enterAddress?: string;
    enterAmount?: string;
}

export interface error {
    amountError: boolean;
    address: boolean;
}

export interface accountReducerStateType {
    value: object | string | undefined;
    isValid: null | boolean;
}

export interface amountReducerStateType {
    value: number;
    isValid: boolean | null;
}

export interface actionAccountReducerType {
    val?: string;
    valid?: string;
    type?: string;
}

export interface actionAmountReducerType {
    type: string;
    value?: number;
    isValid?: boolean;
    bal?: number;
    amountIsValid?: number;
    val?: number;
    txFee?: number;
}

export interface ToInputInterface {
    accountToSate: any;
    publicKey: string;
    errorMessages: errorMessages;
    accountToChangeHandler(e: string): void;
    accountToIsValid(): void;
    isCorrect: boolean;
    error: error;
}

export interface AmountInputInterface {
    amountState: any;
    amountHandler(e: string): void;
    maxInputHandler(): void;
    amountIsValidHandler(): void;
    insufficientBal: boolean;
    currentUser: RootState;
    trimBalance(e: number): string;
    errorMessages: errorMessages;
    error: error;
    transactionFee: number;
}
