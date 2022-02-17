export interface ConfirmSendModalProps {
    open: boolean;
    handleClose(): void;
    // handleConfirm(): void;
    style?: object;
    accountTo: string;
    amount: string;
    accountFrom: string;
    transactionFee: string;
    tokenName: string;
    loading2: boolean;
}
