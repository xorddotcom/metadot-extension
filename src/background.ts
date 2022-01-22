/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable block-scoped-var */
import '@polkadot/extension-inject/crossenv';
import { cryptoWaitReady } from '@polkadot/util-crypto';

cryptoWaitReady()
    .then(() => {
        console.log('keyring init start');
        console.log('keyring init end');
    })
    .catch((error) => {
        console.error('initialization failed', error);
    });
// });
