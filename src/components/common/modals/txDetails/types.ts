interface TransactionRecord {
    accountFrom?: string;
    accountTo?: string;
    amount?: string;
    hash?: string;
    operation?: string;
    status?: string;
    chainName?: string;
    tokenName?: string;
    transactionFee?: string;
    timestamp?: string;
}

export interface TxDetailsProps {
    open: boolean;
    handleClose(): void;
    style?: object;
    txDetailsModalData: TransactionRecord;
}

export interface TxDetailsViewProps {
    open: boolean;
    handleClose(): void;
    style?: object;
    txDetailsModalData: TransactionRecord;
    copy: string;
    tooltipText: { onClick(): void; onMouseOver(): void; style: object };
    getTotalBalance(v1: string, v2: string): number;
}
