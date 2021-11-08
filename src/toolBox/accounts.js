/* eslint-disable no-unused-vars */
import keyring from '@polkadot/ui-keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import encryptpwd from 'encrypt-with-password';

function GenerateSeedPhrase() {
  try {
    const seed = mnemonicGenerate(12);
    return seed;
  } catch (error) {
    console.log('ERROR IN GenerateSeedPhrase', error);
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

export {
  GenerateSeedPhrase, AccountCreation, KeyringInitialization, encrypt, decrypt,
};
