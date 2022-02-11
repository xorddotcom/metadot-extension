export interface Account {
    publicKey: string;
    accountName: string;
    parentAddress?: string;
}

export interface Accounts {
    [key: string]: Account;
}

export interface Transaction {
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
