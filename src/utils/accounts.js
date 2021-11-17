/* eslint-disable no-unused-vars */
import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
import encryptpwd from 'encrypt-with-password';

function GenerateSeedPhrase() {
  try {
    const seed = mnemonicGenerate(12);
    return seed;
  } catch (error) {
    console.log('ERROR IN GenerateSeedPhrase', error);
  }
}

async function validatingSeedPhrase(seedPhrase) {
  try {
    await keyring.addUri(seedPhrase);
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
}

// create account from seed phrase function
async function AccountCreation({ name, password, seed }) {
  try {
    const data = keyring.addUri(seed);
    return data.json;
  } catch (error) {
    console.log('ERROR IN AccountCreation', error);
    return false;
  }
}

// need to invoke this function in background.js script
async function KeyringInitialization() {
  await keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
}

function encrypt(target, password) {
  const encrypted = encryptpwd.encrypt(target, password);
  return encrypted;
}

function decrypt(target, password) {
  const decrypted = encryptpwd.decrypt(target, password);
  return decrypted;
}

const CryptoAndKeyringInit = async () => {
  cryptoWaitReady()
    .then(() => {
      KeyringInitialization();
    })
    .catch((error) => {
      console.error('initialization failed', error);
    });
};

export {
  GenerateSeedPhrase,
  AccountCreation,
  KeyringInitialization,
  encrypt,
  decrypt,
  validatingSeedPhrase,
  CryptoAndKeyringInit,
};
