export interface Account {
    publicKey: string;
    accountName: string;
}

export interface Accounts {
    account: { [key: string]: Account };
}

export interface Transaction {
    address: string;
    amount: number;
    hash: string;
}
