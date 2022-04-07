export interface Recepient {
    amount: string;
    address: string;
    validateAddress?: boolean;
    validateReaping?: boolean;
}

export interface CreateBatchViewProps {
    recepientList: Recepient[];
    setStep(value: number): void;
    addressChangeHandler(value: string, index: number): void;
    amountChangeHandler(value: string, index: number): void;
    addRecepient(recepient: Recepient | Recepient[], overWrite?: boolean): void;
    deleteRecepient(index: number): void;
    setValidation(value: boolean, index: number): void;
    getTransactionFees(): Promise<number>;
    setValidateReaping(value: boolean, index: number): void;
}

export interface RecepientCardInterface {
    recepient: Recepient;
    index: number;
    addressChangeHandler(value: string, index: number): void;
    amountChangeHandler(value: string, index: number): void;
    deleteRecepient(index: number): void;
}

export interface ConfirmBatchViewProps {
    recepientList: Recepient[];
    addressChangeHandler(value: string, index: number): void;
    amountChangeHandler(value: string, index: number): void;
    deleteRecepient(index: number): void;
    sendTransaction(): void;
    isButtonLoading: boolean;
    getTotalAmount(value: string, index: number): string;
    getTransactionFees(): Promise<number>;
    existentialDeposit: number;
}

export interface FileInputProps {
    recepientList: Recepient[];
    addRecepient(recepient: Recepient[], overWrite?: boolean): void;
}
