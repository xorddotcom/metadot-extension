/* eslint-disable block-scoped-var */
/* eslint-disable no-undef */
/* eslint-disable vars-on-top */
import { accounts } from './utils';

const { CryptoAndKeyringInit } = accounts;

// eslint-disable-next-line block-scoped-var
if (typeof browser === 'undefined') {
  // eslint-disable-next-line vars-on-top
  // eslint-disable-next-line no-var
  // eslint-disable-next-line vars-on-top
  // eslint-disable-next-line no-var
  var browser = chrome;
}

chrome.runtime.onInstalled.addListener(() => {
  CryptoAndKeyringInit();
});
