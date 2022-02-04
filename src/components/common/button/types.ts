export interface ButtonInterface {
    id: string;
    variant: string;
    startIcon: JSX.Element | null;
    onClick(): void;
    disabled: boolean;
    height?: string;
    width?: string;
    br?: string;
    cancel?: boolean;
    border?: number;
    fontSize?: string;
}

export interface Props {
    StartIcon?: string;
    handleClick(): void;
    text: string;
    width?: string;
    height?: string;
    br?: string;
    fontSize?: string;
    cancel?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    border?: number;
    id: string;
}
