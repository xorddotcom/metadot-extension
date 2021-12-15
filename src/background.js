/* eslint-disable block-scoped-var */
/* eslint-disable no-undef */
/* eslint-disable vars-on-top */
// import { AccountsStore } from '@polkadot/extension-base/stores';
// import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
// import { AccountsStore } from '@polkadot/extension-base/stores';
// import { CryptoAndKeyringInit } from './utils/accounts';

// eslint-disable-next-line block-scoped-var
if (typeof browser === 'undefined') {
  // eslint-disable-next-line vars-on-top
  // eslint-disable-next-line no-var
  // eslint-disable-next-line vars-on-top
  // eslint-disable-next-line no-var
  var browser = chrome;
}

// chrome.runtime.onInstalled.addListener(() => {
// CryptoAndKeyringInit();
cryptoWaitReady()
  .then(() => {
    console.log('keyring init start');
    // keyring.loadAll({ type: 'sr25519' });
    console.log('keyring init end');
  })
  .catch((error) => {
    console.error('initialization failed', error);
  });
// });
