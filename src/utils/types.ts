import type { KeyringPair } from '@polkadot/keyring/types';

export interface UnlockPairReturnType {
    status: boolean;
    sender: string | KeyringPair;
}

export interface QueryObjectInterface {
    query: string;
    endPoint: string;
}

export interface RecepientInterface {
    amount: string;
    address: string;
    token: string;
    validateAddress?: boolean;
    validateReaping?: boolean;
    empytAmount?: boolean;
    empytAaddress?: boolean;
    insufficientError?: boolean;
}
