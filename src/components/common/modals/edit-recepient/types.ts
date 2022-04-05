export interface ResponseModalProps {
    open: boolean;
    handleClose(): void;
    addressChangeHandler(value: string, index: number): void;
    amountChangeHandler(value: string, index: number): void;
    style?: object;
    activeRecepient: ActiveRecepient;
}

interface ActiveRecepient {
    index: number;
    amount: string;
    address: string;
}
