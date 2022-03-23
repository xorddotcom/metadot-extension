import { SetStateAction } from 'react';
import { RootState } from '../../redux/store';

export interface errorMessages {
    invalidAddress?: string;
    enterAddress?: string;
    enterAmount?: string;
    sameAddressError?: string;
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
    errorMessages: errorMessages;
    onChange(e: string): void;
    isCorrect: boolean;
    receiverAddress: string;
}

export interface Account {
    publicKey: string;
    accountName: string;
    parentAddress?: string;
}

export interface AmountInputInterface {
    onChange(e: string): void;
    maxInputHandler(): void;
    insufficientBal: boolean;
    errorMessages: errorMessages;
    transactionFee: number;
    amount: any;
}

type transferAllType = {
    transferAll: boolean;
    keepAlive: boolean;
};

type disableToggleButtons = {
    firstToggle: boolean;
    secondToggle: boolean;
};

export interface SendViewProps {
    toInput: ToInputInterface;
    amountInput: AmountInputInterface;
    nextBtn: {
        id: string;
        text: string;
        style: {
            height: string | number;
            width: string | number;
            borderRadius: number;
        };
        handleClick(): void;
        disabled: boolean;
        isLoading: boolean;
    };
    confirmSend: {
        accountTo: string;
        amount: any;
        transactionFee: number;
        handleClose(): void;
        loading2: boolean;
    };
    setTransferAll: React.Dispatch<SetStateAction<transferAllType>>;
    setAmountOnToggle(input: boolean, keepAlive: boolean): void;
    transactionFee: number;
    existentialDeposit: number;
    disableToggleButtons: disableToggleButtons;
}

// setTxDetailsModalData: Dispatch<SetStateAction<TransactionRecord>>;

export interface CalculatedAmountInterface {
    marginTop?: string;
}
