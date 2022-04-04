export interface Recepient {
    amount: string;
    address: string;
}

export interface CreateBatchViewProps {
    recepientList: Recepient[];
    setRecepientList(value: Recepient[]): void;
    setStep(value: number): void;
}

export interface ConfirmBatchViewProps {
    recepientList: Recepient[];
    setRecepientList(value: Recepient[]): void;
}
