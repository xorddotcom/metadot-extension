import type { KeyringPair } from '@polkadot/keyring/types';

type Sender = KeyringPair | string;

export interface AuthtModalProps {
    open: boolean;
    handleClose(e?: any): void;
    style?: object;
    functionType?: string;
    onConfirm(value1: string, value2: string): Promise<boolean>;
    publicKey: string;
    setOpenAuthModalHandler?(): void;
}

export interface AuthtModalViewProps {
    style?: object;
    open: boolean;
    onClose(): void;
    styledInput?: any;
    btnCancel?: any;
    btnConfirm?: any;
    functionType?: string;
    inputErrorState?: string;
}
