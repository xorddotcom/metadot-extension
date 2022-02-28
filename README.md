# Metadot Browser Extension

Metadot is a browser extension based crypto wallet built to support the Polkadot & Kusama Ecosystem. 

Metadot supports Firefox, Google Chrome, and Chromium-based browsers. We recommend using the latest available browser version.


## Pre-requisites:

-   Node.js
-   yarn
-   Firefox or Chrome.

## How to Setup Locally

Execute the following to clone, install dependencies, and run a development server:

```
git clone https://github.com/XORD-one/metadot-extension.git
cd metadot-extension
yarn install
yarn run build

```

While in Chrome:

-   Go to chrome://extensions
-   Enable 'Developer Mode' (top right corner of window)
-   Click "Load Unpacked" and select the metadot-extension/build directory

The Metadot icon should show up in your Chrome toolbar.

While in Firefox:

-   Go to about:debugging#/runtime/this-firefox
-   Click 'Load Temporary Addon'
-   select the metadot-extension/build/manifest.json file

The Metadot icon should show up in your Firefox toolbar.

## How Metadot Works?

What Metadot brings to the table is that, it gives support both for main networks (i.e relay and parachains) and their test networks, so it aims to be one stop solution for any user who wants to hold, receive, send their funds or experiment with testnet faucets.

### Multiple Accounts :
User can import or create infinite number of independent(parent) accounts but can only derive one account from each of the parent account for now. This will be further enhanced in a future version of Metadot.

### Network Configuration :
Metadot aims to offer easy integration of new networks. We aim to have a simple configuration file that will help support a new network with just few lines of configuration. Currently, there is **onchain.js** where all the integrated chains have the configurations, we will continue to improve this architecture.

### Api Initialization :
There is a separate component for it named **api-manager** which is responsible for initialization of selected network for the whole application. This component is dependent on the value rpcUrl stored in our redux-persist. This mechanism helps us to optimize network usage and offer a smooth user experience.

### Maintaining Transaction Records :
We are using **[subquery](https://subquery.network/)** for getting overall history of transaction records(both send and receive) for every integrated network. This means the wallet keeps transaction records of not just the transactions from Metadot but all other channels as well.

### Note :
Our current codebase is under refactoring phase in which we are migrating the whole application into Typescript and optimizing code.
