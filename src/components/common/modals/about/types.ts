export interface AboutModalProps {
    open: boolean;
    handleClose(): void;
    style: object;
    jsonData?: string;
}
