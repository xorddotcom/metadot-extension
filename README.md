# What is Metadot

MetaDot previously named as Pollo Wallet is a Browser Extension based crypto wallet built to support the Polkadot Ecosystem. It is supported on Firefox and chrome as well. The exciting part of it is it gives support both for main networks (i.e relay and para chains) and their test networks, so it'll be a one stop solution for any user who wants to hold, receive or send their funds or experiment with test net's faucets.

## Pre-requisites:
 - Node.js
 - firefox or chrome as browsers

## How to Setup Locally
1. clone the repo.
2. `yarn install` or `npm install` to install the dependencies  
3. `yarn run build` or `npm run build` to build the extension, then the bundle results will be in the `plugin` file 
4. Install the extension on `CHROME` :
    - go to `chrome://extensions/`
    - ensure you have the Development Mode on
    - "Load unpacked" and point to `root/build`
5. Install the extension on `FIREFOX` :
    - go to `about:debugging#/runtime/this-firefox`
    - "Load Temporary Ad-on" and point to `root/build/manifest.json`
