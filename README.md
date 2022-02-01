# What is Metadot

Metadot is a Browser Extension based crypto wallet built to support the Polkadot Ecosystem. It is supported on Firefox and chrome as well. The exciting part of it is it gives support both for main networks (i.e relay and para chains) and their test networks, so it'll be a one stop solution for any user who wants to hold, receive or send their funds or experiment with test net's faucets.

## Pre-requisites:

- Node.js
- yarn
- firefox or chrome as browsers

## How to Setup Locally

Execute the following to clone, install dependencies, and run a development server:

```
git clone https://github.com/XORD-one/metadot-extension.git
cd metadot-extension
yarn install
yarn run build
```

Once running Chrome:

- Go to chrome://extensions
- Enable 'Developer Mode' (top right corner of window)
- Click "Load Unpacked" and select the metadot-extension/build directory

The Metadot icon should show up in your Chrome toolbar.

Once running Firefox:

- Go to about:debugging#/runtime/this-firefox
- Click 'Load Temporary Addon'
- select the metadot-extension/build/manifest.json file

The Metadot icon should show up in your Firefox toolbar.
