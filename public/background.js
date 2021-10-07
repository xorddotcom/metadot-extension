// (function () {
//     // if (typeof browser === 'undefined') {
//     //   var browser = chrome;
//     // }
//     // if (window.hasRun) {
//     //   return;
//     // }
//     // window.hasRun = true;
//     console.log('CHAL GAYA from background.js');
//     // browser.runtime.onMessage.addListener(message => {
//     //   if (message.command === 'beastify') {
//     //     console.log('from background.js-----------------------------');
//     //   }
//     // });
//     chrome.runtime.onMessage.addListener(function (
//       request,
//       sender,
//       sendResponse,
//     ) {
//       console.log(
//         sender.tab
//           ? 'from a content script:' + sender.tab.url
//           : 'from the extension',
//       );
//       if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' });
//     });
//   })();  