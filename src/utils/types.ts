import type { KeyringPair } from '@polkadot/keyring/types';

export interface UnlockPairReturnType {
    status: boolean;
    sender: string | KeyringPair;
}

export interface QueryObjectInterface {
    query: string;
    endPoint: string;
}
