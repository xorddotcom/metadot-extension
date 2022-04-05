export interface Recepient {
    amount: string;
    address: string;
}

export interface CreateBatchViewProps {
    recepientList: Recepient[];
    setStep(value: number): void;
    addressChangeHandler(value: string, index: number): void;
    amountChangeHandler(value: string, index: number): void;
    addRecepient(recepient: Recepient): void;
    deleteRecepient(index: number): void;
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
}
