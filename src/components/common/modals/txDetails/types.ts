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
