import '@polkadot/extension-inject/crossenv';
import { cryptoWaitReady } from '@polkadot/util-crypto';

cryptoWaitReady()
    .then(() => {
        console.log('keyring init start');
        console.log('keyring init end');
    })
    .catch((error: string) => {
        console.error('initialization failed', error);
    });
