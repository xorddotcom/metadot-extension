export interface ResponseModalProps {
    open: boolean;
    handleClose(): void;
    style?: object;
    mainText: string;
    subText: string;
    responseImage: string;
}
