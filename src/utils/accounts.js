/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
import encryptpwd from 'encrypt-with-password';
// import { AccountsStore } from '@polkadot/extension-base/stores';

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

// need to invoke this function in background.js script
async function KeyringInitialization() {
  // await keyring.loadAll({ store: new AccountsStore(), type: 'sr25519' });
  await keyring.loadAll({ type: 'sr25519' });
}

// get json backup
const getJsonBackup = async (address, password) => {
  const addressKeyring = address && keyring.getPair(address);
  try {
    const backupJson = addressKeyring && keyring.backupAccount(addressKeyring, password);
    // ***Download JSON file***
    const fileName = 'backup';
    const data = JSON.stringify(backupJson);
    const blob = new Blob([data], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // ***Download JSON file***
  } catch (e) {
    console.log('e in backup func', e);
  }
};

// create account from seed phrase function
async function AccountCreation({
  name, password, seed,
}) {
  try {
    const data = keyring.addUri(seed, password, { name });
    return data.json;
  } catch (error) {
    console.log('ERROR IN AccountCreation', error);
    await KeyringInitialization();
    const data = keyring.addUri(seed, password, { name });
    return data.json;
  }
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
      console.log('>>>>>>>>>>>>>>>>>> Keyring starts');
      KeyringInitialization();
      console.log('>>>>>>>>>>>>>>>>>> Keyring ends');
    })
    .catch((error) => {
      console.error('initialization failed', error);
    });
};

export default {
  GenerateSeedPhrase,
  AccountCreation,
  KeyringInitialization,
  encrypt,
  decrypt,
  validatingSeedPhrase,
  CryptoAndKeyringInit,
  getJsonBackup,
};
