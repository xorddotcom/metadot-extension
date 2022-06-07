interface TransactionRecord {
    accountFrom: string;
    accountTo: string[];
    amount: number[];
    hash: string;
    operation: string;
    status: string;
    chainName: string;
    tokenName: string[];
    transactionFee: string;
    timestamp: string;
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
    tooltipText: {
        onClick(v?: string[] | string): void;
        onMouseOver(): void;
        style: object;
    };
    getTotalBalance(v1: number[], v2: string, v3: string, v4: any): any;
}
