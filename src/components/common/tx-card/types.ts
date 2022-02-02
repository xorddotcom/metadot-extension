export interface Props {
    operation: string;
    status: string;
    coin: string;
    amount: string;
    amountInUsd: string;
    logo: string;
    handleClick(): void;
}
