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

console.log('///////////from inside background.js');

chrome.runtime.onInstalled.addListener(() => {
  console.log('i will run once! upon ONINSTALLED');
  (async () => {
    cryptoWaitReady()
      .then(() => {
        console.log('crypto initialized');

        // load all the keyring data
        // keyring.loadAll({ store: new AccountsStore(), type: 'sr25519' });
        keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
        console.log(' crypto initialization completed');
      })
      .catch((error) => {
        console.error('initialization failed', error);
      });
    // await keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
    // console.log('Keyring load All invocation Completed');
  })();
});

console.log('//////////from inside background.jsxxxxxxxxxxxx');
