export interface Account {
    publicKey: string;
    accountName: string;
    parentAddress?: string;
}

export interface Accounts {
    [key: string]: Account;
}

export interface TransactionRecord {
    accountFrom: string;
    accountTo: string[];
    amount: number[];
    hash: string;
    operation: string;
    status: string;
    chainName: string;
    tokenName: string;
    transactionFee: string;
    timestamp: string;
}

export interface Transaction {
    [hash: string]: TransactionRecord;
}

export interface Transactions {
    [publicKey: string]: Transaction;
}

interface decimal {
    new: number;
    old: number;
}

interface TOKEN {
    name: string;
    decimals: number | decimal;
}

export interface TOKEN_INFO_INTERFACE {
    [TokenName: string]: TOKEN;
}
