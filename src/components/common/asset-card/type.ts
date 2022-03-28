export interface Props {
    name: string;
    amount: string;
    shortName: string;
    amountInUsd: number;
    logo: string;
    isNative: boolean;
}

export interface ViewProps {
    tokenLogo: JSX.Element;
    chainName: string;
    AssetDetails: JSX.Element;
    apiInitializationStarts: boolean;
}
