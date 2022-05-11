export interface WarningModalProps {
    open: boolean;
    handleClose(): void;
    name: string;
    address: string;
    threshold: number;
    singatories: string[];
}
