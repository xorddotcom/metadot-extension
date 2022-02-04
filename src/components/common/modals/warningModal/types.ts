export interface WarningModalProps {
    open: boolean;
    handleClose(): void;
    style?: object;
    image?: string;
    mainText?: string;
    subText?: string;
    onConfirm(): void;
}
