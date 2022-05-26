export interface ConfirmSendModalProps {
    handleClose(): void;
    style?: object;
    accountTo: string;
    amount: string;
    transactionFee: number;
    loading2: boolean;
}

export interface ConfirmSendModalViewProps {
    handleClose(): void;
    accountTo: string;
    amount: string;
    transactionFee: number;
    loading2: boolean;
    transactionAmount(v1: string, v2: number): string;
    btnConfirm: any;
    locationTokenName?: string;
    isNative?: boolean;
}
