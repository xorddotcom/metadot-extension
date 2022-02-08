export interface AuthtModalProps {
    open: boolean;
    handleClose(): void;
    style?: object;
    onConfirm(publicKey: string, password: string, sender: object): void;
    publicKey: string;
    setOpenAuthModal?(openAuthModal: boolean): void;
}
