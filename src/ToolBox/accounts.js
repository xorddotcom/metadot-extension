import keyring from '@polkadot/ui-keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';

// (async () => {
//   console.log('new check 1');
//   await cryptoWaitReady();
//   console.log('new check 2');
//   keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
//   console.log('new check 3');
// })();

// generate and return seed phrase function
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
async function AccountCreation({ name, password, seed }, isKeyringInitialized = false) {
  console.log('In account creation');

  try {
    console.log('Account creation Password', name, password);
    // await waitReady()
    // await cryptoWaitReady();
    if (!isKeyringInitialized) keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
    const data = keyring.addUri(seed);
    // const data = keyring.addUri(seed, password, { name });
    console.log('Data', data);
    return data.json;

    // additional initialization here, including rendering
    // });
  } catch (error) {
    console.log('ERROR IN AccountCreation', error);
    // throw error;
    return false;
  }
}

// need to invoke this function in background.js script
async function KeyringInitialization() {
  // await cryptoWaitReady()
  //   .then(async () => {
  //     console.log('crypto initialized checker');

  //     // load all the keyring data
  console.log('inside keyring load all');
  await keyring.loadAll({ ss58Format: 42, type: 'sr25519' });

  //     console.log('INITIALIZATION COMPLETED checker');
  //   })
  //   .catch((error) => {
  //     console.error('INITIALIZATION failed', error);
  //   });
}

export { GenerateSeedPhrase, AccountCreation, KeyringInitialization };
