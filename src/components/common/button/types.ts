export interface ButtonInterface {
    id: string;
    variant?: string;
    startIcon: JSX.Element | null;
    onClick(): void;
    disabled: boolean;
    elevation?: number;
    lightBtn?: boolean;
}

interface ButtonStyle {
    width: string | number;
    height: string | number;
    borderRadius: string | number;
}
export interface Props {
    className?: string;
    lightBtn?: boolean;
    id: string;
    StartIcon?: string;
    handleClick(): void;
    isLoading?: boolean;
    text: string;
    style: ButtonStyle;
    disabled?: boolean;
}

export interface ButtonViewProps {
    id: string;
    startIcon: JSX.Element | null;
    disabled: boolean;
    lightBtn?: boolean;
    onClick(): void;
    className: string;
    elevation: number;
    disableRipple: boolean;
    style: ButtonStyle;
    text: string;
    isLoading?: boolean;
}
