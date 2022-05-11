export interface Account {
    publicKey: string;
    accountName: string;
    parentAddress?: string;
    multisig?: boolean;
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
    tokenName: string[];
    transactionFee: string;
    timestamp: string;
}

export interface Transaction {
    [hash: string]: TransactionRecord;
}

export interface Transactions {
    [publicKey: string]: Transaction;
}

export type BalancesType = {
    name: string;
    balance: number;
    isNative: boolean;
    decimal: number;
    tokenImage?: string;
};

export interface ActiveAccount {
    isLoggedIn: boolean;
    publicKey: string;
    accountName: string;
    rpcUrl: string;
    chainName: string;
    tokenName: string;
    tokenImage: string;
    balance: number;
    balanceInUsd: number;
    jsonFileUploadScreen: boolean;
    prefix: number;
    lastVisitedTimestamp: string;
    queryEndpoint: string;
    isWalletConnected: boolean;
    balances: BalancesType[];
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
