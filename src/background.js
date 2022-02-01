/* eslint-disable block-scoped-var */
/* eslint-disable no-undef */
/* eslint-disable vars-on-top */
// import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import keyring from '@polkadot/ui-keyring';
// import { AccountsStore } from '@polkadot/extension-base/stores';

// eslint-disable-next-line block-scoped-var
if (typeof browser === 'undefined') {
  // eslint-disable-next-line vars-on-top
  // eslint-disable-next-line no-var
  // eslint-disable-next-line vars-on-top
  // eslint-disable-next-line no-var
  var browser = chrome;
}

chrome.runtime.onInstalled.addListener(() => {
  (async () => {
    cryptoWaitReady()
      .then(() => {
        // load all the keyring data
        // keyring.loadAll({ store: new AccountsStore(), type: 'sr25519' });
        keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
      })
      .catch((error) => {
        console.error('initialization failed', error);
      });
  })();
});
