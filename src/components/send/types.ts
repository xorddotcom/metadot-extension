import { SetStateAction } from 'react';
import { AmountInputInterface } from '../common/amount-input/types';
import { ToInputInterface } from '../common/to-input/types';

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

export interface Account {
    publicKey: string;
    accountName: string;
    parentAddress?: string;
}

export interface ExistensialDepositInterface {
    onChange(e: string): void;
    setTransferAll: React.Dispatch<SetStateAction<transferAllType>>;
    setAmountOnToggle(input: boolean, keepAlive: boolean): void;
    disableToggleButtons: disableToggleButtons;
    existentialDeposit: number;
    transferAll: transferAllType;
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
    ED: any;
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
}

export interface BatchSendViewProps {
    amount: string;
    address: string;
    id: number;
    recepientNumber: number;
    handleDelete(): void;
}
export interface CalculatedAmountInterface {
    marginTop?: string;
}
