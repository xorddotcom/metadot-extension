export interface Props {
    name: string;
    amount: string;
    shortName: string;
    balanceInUsd: number;
    logo: string;
    isNative: boolean;
    decimal: number;
}

export interface ViewProps {
    tokenLogo: JSX.Element;
    chainName: string;
    AssetDetails: JSX.Element;
    apiInitializationStarts: boolean;
    balance: string;
    tokenName: string;
    isNative: boolean;
    decimal: number;
}
