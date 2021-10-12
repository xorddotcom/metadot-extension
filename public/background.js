(async function () {
  console.log('CHAL GAYA from inside background.js');

  // Called when the user clicks on the browser action
  // eslint-disable-next-line no-unused-vars
  // chrome.browserAction.onClicked.addListener((tab) => {
  //   // Send a message to the active tab
  //   chrome.tabs.query({ active: true, currentWindow: true },
  //     (tabs) => {
  //       const activeTab = tabs[0];
  //       chrome.tabs.sendMessage(activeTab.id,
  //         { message: 'clicked_browser_action' });
  //     });
  // });
  // console.log('------', obj.arrayOfFourRandomNumbers());
  // await cryptoWaitReady()
  //   .then(() => {
  //     console.log('crypto initialized');

  //     // load all the keyring data
  //     keyring.loadAll({ ss58Format: 42, type: 'sr25519' });

  //     console.log('INITIALIZATION COMPLETED');
  //   })
  //   .catch((error) => {
  //     console.error('INITIALIZATION failed', error);
  //   });
  // // initial setup
  // cryptoWaitReady()
  //   .then(() => {
  //     console.log('crypto initialized');

  //     // load all the keyring data
  //     keyring.loadAll({ store: new AccountsStore(), type: 'sr25519' });

  //     console.log('initialization completed');
  //   })
  //   .catch((error)=> {
  //     console.error('initialization failed', error);
  //   });

  // browser.runtime.onMessage.addListener(message => {
  //   if (message.command === 'beastify') {
  //     console.log('from background.js-----------------------------');
  //   }
  // });
  // chrome.runtime.onMessage.addListener(function (
  //   request,
  //   sender,
  //   sendResponse,
  // ) {
  //   console.log(
  //     sender.tab
  //       ? 'from a content script:' + sender.tab.url
  //       : 'from the extension',
  //   );
  //   if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' });
  // });

  // chrome.extension.onConnect.addListener((port) => {
  //   chrome.runtime.onMessage.addListener(
  //     (request, sender, sendResponse) => {
  //       console.log(sender.tab
  //         ? `from a content script:${sender.tab.url}`
  //         : 'from the extension');
  //       if (request.greeting === 'hello') { sendResponse({ farewell: 'goodbye' }); }
  //     },
  //   );
  // });
}());
console.log('CHAL GAYA from outside background.js');
// chrome.runtime.onMessage.addListener(
// (request, sender, sendResponse) => {
//   console.log('from the extension', sender);
//   if (request.greeting === 'hello') { sendResponse({ farewell: 'goodbye' }); }
// },
// );

// listen to all messages and handle appropriately
// chrome.runtime.onConnect.addListener((port) => {
//   // shouldn't happen, however... only listen to what we know about
//   assert([
// PORT_CONTENT, PORT_EXTENSION].includes(port.name), `Unknown connection from ${port.name}`);

//   // message and disconnect handlers
//   port.onMessage.addListener((data) => {
//     console.log('HERE......');
//     console.log('INSIDE!!!!!!!!!!!!', data);
//   });
//   port.onDisconnect.addListener(() => console.log(`Disconnected from ${port.name}`));
// });
