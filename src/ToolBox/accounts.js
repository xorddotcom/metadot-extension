import keyring from '@polkadot/ui-keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Account_Type } from '../constants/onchain';

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

function AccountCreation({ name, password, seed }) {
  try {
    const { pair, json } = keyring.addUri(
      seed,
      password,
      { name },
      Account_Type,
    );
    return { pair, json, seed };
  } catch (error) {
    console.log('ERROR IN AccountCreation', error);
  }
}

export { GenerateSeedPhrase, AccountCreation };
