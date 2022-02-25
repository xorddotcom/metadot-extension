export interface activeAccountInitialState {
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
    accountCreationStep: number;
    tempSeed: string;
    lastVisitedTimestamp: string;
    queryEndpoint: string;
}

export interface useResponseModalProps {
    isOpen: boolean;
    modalImage: string;
    mainText: string;
    subText: string;
}
