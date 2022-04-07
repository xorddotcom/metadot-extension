export interface ResponseModalProps {
    open: boolean;
    handleClose(): void;
    addressChangeHandler(value: string, index: number): void;
    amountChangeHandler(value: string, index: number): void;
    style?: object;
    activeRecepient: ActiveRecepient;
    getTotalAmount(value: string, index: number): string;
    getTransactionFees: () => Promise<number>;
    existentialDeposit: number;
}

interface ActiveRecepient {
    index: number;
    amount: string;
    address: string;
}
