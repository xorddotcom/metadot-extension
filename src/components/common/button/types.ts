export interface ButtonInterface {
    id: string;
    variant: string;
    startIcon: JSX.Element | null;
    onClick(): void;
    disabled: boolean;
    height?: number;
    width?: string;
    br?: boolean;
    cancel?: boolean;
    border?: number;
    fontSize?: number;
}

export interface Props {
    StartIcon?: string;
    handleClick(): void;
    text: string;
    width?: string;
    height?: number;
    br?: boolean;
    fontSize?: number;
    cancel?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    border?: number;
    id: string;
}
