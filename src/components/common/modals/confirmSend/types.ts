export interface ConfirmSendModalProps {
    open: boolean;
    handleClose(): void;
    // handleConfirm(): void;
    style?: object;
    accountTo: string | object | undefined;
    amount: string;
    accountFrom: string;
    transactionFee: number;
    tokenName: string;
    loading2: boolean;
}
