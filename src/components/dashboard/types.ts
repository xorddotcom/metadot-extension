import { Dispatch, SetStateAction } from 'react';
import { TransactionRecord } from '../../redux/types';

export interface MainCardPropsInterface {
    balance: number;
    address: string;
    prefix: number;
    balanceInUsd: number;
    tokenName: string;
    accountName: string;
}

export interface DropDownProps {
    open: boolean;
    handleClose(): void;
    anchorEl: Element | null;
    classes?: { customWidth: string; flex: string };
    handleClickOnAccountSettings(e: any): void;
}

export interface AssetsAndTransactionsPropsInterface {
    handleOpenTxDetailsModal(): void;
    setTxDetailsModalData: Dispatch<SetStateAction<TransactionRecord>>;
    transactionData: Transactions;
}

export interface Transaction {
    [hash: string]: TransactionRecord;
}

export interface Transactions {
    [publicKey: string]: Transaction;
}

export interface TxViewProps {
    transactionData: Transactions;
    tokenName: string;
    handleClickOnTxCard(tx: TransactionRecord): void;
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
    EXISTENTIAL_DEPOSIT?: number;
    queryEndpoint: string;
    name: string;
    logo: string;
    moreOptions?: boolean;
    relayChain?: boolean;
    rpcUrl: string;
    prefix: number;
    disabled?: boolean;
    icon?: string;
    tokenName: string;
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

export interface DashboardViewProps {
    isLoading: boolean;
    transactionData: Transactions;
    txDetailsModalData: TransactionRecord;
    setTxDetailsModalData: Dispatch<SetStateAction<TransactionRecord>>;
    isTxDetailsModalOpen: boolean;
    setIsTxDetailsModalOpen(v: boolean): void;
    publicKey: string;
    prefix: number;
    chainName: string;
    balance: number;
    balanceInUsd: number;
    tokenName: string;
    accountName: string;
    isModalOpen: boolean;
    setIsModalOpen(v: boolean): void;
    modalState: ModalStateInterface;
    resetState(): void;
    handleSelectionOnKusamaMainNetwork(data: NetworkConfigType): Promise<void>;
    handleSelection(data: NetworkConfigType): Promise<void>;
    anchorEl: any;
    open: boolean;
    handleClickOnAccountSettings(e: any): void;
    handleCloseDropDown(): void;
    apiInitializationStarts: boolean;
}
