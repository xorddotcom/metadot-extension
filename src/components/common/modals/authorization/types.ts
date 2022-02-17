import type { KeyringPair } from '@polkadot/keyring/types';

type Sender = KeyringPair | string;

export interface AuthtModalProps {
    open: boolean;
    handleClose(): void;
    style?: object;
    onConfirm(publicKey: string, password: string): void;
    publicKey: string;
    setOpenAuthModalHandler?(): void;
}
