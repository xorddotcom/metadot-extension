// // Copyright 2019-2021 @polkadot/extension authors & contributors
// // SPDX-License-Identifier: Apache-2.0

// // Runs in the extension background, handling all keyring access

// import handlers from '@polkadot/extension-base/background/handlers';
// import {
//   PORT_CONTENT,
//   PORT_EXTENSION,
// } from '@polkadot/extension-base/defaults';
// import { AccountsStore } from '@polkadot/extension-base/stores';
// import chrome from '@polkadot/extension-inject/chrome';
// import keyring from '@polkadot/ui-keyring';
// import { assert } from '@polkadot/util';
// import { cryptoWaitReady } from '@polkadot/util-crypto';

// // setup the notification (same a FF default background, white text)
// // eslint-disable-next-line no-void
// void chrome.browserAction.setBadgeBackgroundColor({ color: '#d90000' });

// // listen to all messages and handle appropriately
// chrome.runtime.onConnect.addListener((port): void => {
//   // shouldn't happen, however... only listen to what we know about
//   assert(
//     [PORT_CONTENT, PORT_EXTENSION].includes(port.name),
//     `Unknown connection from ${port.name}`,
//   );

//   // message and disconnect handlers
//   port.onMessage.addListener(data => handlers(data, port));
//   port.onDisconnect.addListener(() =>
//     console.log(`Disconnected from ${port.name}`),
//   );
// });

// // initial setup
// cryptoWaitReady()
//   .then((): void => {
//     console.log('crypto initialized');

//     // load all the keyring data
//     keyring.loadAll({ store: new AccountsStore(), type: 'sr25519' });

//     console.log('initialization completed');
//   })
//   .catch((error): void => {
//     console.error('initialization failed', error);
//   });

(function () {
  // if (typeof browser === 'undefined') {
  //   var browser = chrome;
  // }

  // if (window.hasRun) {
  //   return;
  // }
  // window.hasRun = true;

  console.log('CHAL GAYA from background.js');
  // browser.runtime.onMessage.addListener(message => {
  //   if (message.command === 'beastify') {
  //     console.log('from background.js-----------------------------');
  //   }
  // });

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse,
  ) {
    console.log(
      sender.tab
        ? 'from a content script:' + sender.tab.url
        : 'from the extension',
    );
    if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' });
  });
})();
