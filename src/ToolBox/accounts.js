import keyring from '@polkadot/ui-keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';

function GenerateSeedPhrase() {
  console.log('seed generation started!');
  try {
    const seed = mnemonicGenerate(12);
    console.log('seed generated!', { seed });
    return seed;
  } catch (error) {
    console.log('ERROR IN GenerateSeedPhrase', error);
  }
}

// create account from seed phrase function
async function AccountCreation({ name, password, seed }) {
  console.log('In account creation');
  console.log('Account creation Password', name, password, seed);

  try {
    const data = keyring.addUri(seed);
    console.log('Data', data);

    return data.json;
  } catch (error) {
    console.log('ERROR IN AccountCreation', error);
    return false;
  }
}

// need to invoke this function in background.js script
async function KeyringInitialization() {
  console.log('inside keyring load all');
  await keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
}

export { GenerateSeedPhrase, AccountCreation, KeyringInitialization };
