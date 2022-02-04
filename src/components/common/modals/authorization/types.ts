export interface AuthtModalProps {
    open: true;
    handleClose(): void;
    style: object;
    onConfirm(publicKey: string, password: string, sender: object): void;
    publicKey: string;
    setOpenAuthModal(openAuthModal: boolean): void;
}
