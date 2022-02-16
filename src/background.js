/* eslint-disable block-scoped-var */
/* eslint-disable no-undef */
/* eslint-disable vars-on-top */
// import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
// import { setLastVisitedTimestamp } from './redux/slices/activeAccount';
// import store from './redux/store';
// import { accounts } from './utils';

// const { CryptoAndKeyringInit } = accounts;

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

// chrome.runtime.onConnect.addListener((port) => {
//   if (port.name === 'popup') {
//     port.onDisconnect.addListener(() => {
//       console.log('popup has been closed');
//       console.log('extension closed!!!!');
//       const currTime = Date.now();
//       console.log('currTime ----', { currTime });
//       store.dispatch(setLastVisitedTimestamp(currTime));
//     });
//   }
// });
