import { Dispatch, SetStateAction } from 'react';

export interface MainCardPropsInterface {
    balance: number;
    address: string;
    balanceInUsd: number;
    tokenName: string;
    accountName: string;
}

export interface DropDownProps {
    open: boolean;
    handleClose(): void;
    anchorEl: Element | null;
    classes?: { customWidth: string; flex: string };
}

export interface AssetsAndTransactionsPropsInterface {
    handleOpenTxDetailsModal(): void;
    setTxDetailsModalData: Dispatch<SetStateAction<TransactionRecord>>;
    transactionData: TransactionRecord[];
}

export interface TransactionRecord {
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

export interface TransactionRecordFromSubQuery {
    id: string;
    token: string;
    decimals: string;
    extrinsicHash: string;
    amount: string;
    status: boolean;
    toId: string;
    fromId: string;
    timestamp: string;
}

export interface NetworkConfigType {
    name: string;
    theme?: string;
    moreOptions?: boolean;
    rpcUrl?: string;
    prefix: number;
    disabled?: boolean;
    icon?: string;
    tokenName?: string;
    parachain?: boolean;
    mainNetwork?: boolean;
    testNet?: null | string;
}

export interface RenderMethodProps {
    data: NetworkConfigType;
    handleClick(v: NetworkConfigType): Promise<void>;
}

export interface ModalStateInterface {
    firstStep: boolean;
    renderMethod(obj?: RenderMethodProps): JSX.Element;
    currentData: NetworkConfigType[];
}
