export interface Props {
    operation?: string;
    status?: string;
    coin?: string;
    amount?: string;
    amountInUsd?: string;
    logo?: string;
    handleClick(): void;
    timestamp?: string;
}

export interface TxDateRowInterface {
    width?: string;
    id?: string;
    className?: string;
    color?: string;
    balOverFlow?: boolean;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
}
