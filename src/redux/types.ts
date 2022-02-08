export interface Account {
    publicKey: string;
    accountName: string;
    parentAddress: string;
}

export interface Accounts {
    [key: string]: Account;
}

export interface Transaction {
    address: string;
    amount: number;
    hash: string;
}
