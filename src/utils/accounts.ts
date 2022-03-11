import { mnemonicGenerate } from '@polkadot/util-crypto';
import type { KeyringPair$Json } from '@polkadot/keyring/types';
import {
    validateSeed,
    createAccountSuri,
    jsonRestore,
    exportAccount,
    validateAccount as validateAccountMessage,
    deriveAccount,
    forgetAccount,
    editAccount,
    validateDerivePath,
    signTransaction as signTransactionMessage,
} from '../messaging';

function GenerateSeedPhrase(): string {
    const seed = mnemonicGenerate(12);
    return seed;
}

async function signTransaction(
    address: string,
    password: string,
    txHex: string
): Promise<any> {
    const { signature } = await signTransactionMessage(
        address,
        password,
        txHex
    );
    return signature;
}

async function validatingSeedPhrase(
    seedPhrase: string
): Promise<{ address: string; suri: string }> {
    const validated = await validateSeed(seedPhrase);
    return validated;
}

async function getJsonBackup(
    address: string,
    password: string
): Promise<boolean> {
    try {
        const backupJson = await exportAccount(address, password);

        console.log('backupJson', backupJson);
        const jsonContent = backupJson.exportedJson;
        console.log('jsonContent', jsonContent);

        // ***Download JSON file***
        const fileName = address;
        const data = JSON.stringify(jsonContent);
        const blob = new Blob([data], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = `${fileName}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return true;
        // ***Download JSON file***
    } catch (e) {
        console.log('e in backup func', e);
        return false;
    }
}

// create account from seed phrase function
async function AccountCreation(
    name: string,
    password: string,
    seed: string
): Promise<boolean> {
    const account = await createAccountSuri(name, password, seed);
    return account;
}

async function createAccountFromJSON(
    json: KeyringPair$Json,
    password: string
): Promise<boolean> {
    try {
        await jsonRestore(json, password);
        return true;
    } catch (error) {
        console.log('error in json restore ==>>', error);
        return false;
    }
}

// derive account creation
async function derive(
    parentAddress: string,
    suri: string,
    parentPassword: string,
    name: string,
    password: string,
    genesisHash: string | null
): Promise<boolean> {
    try {
        const res = await deriveAccount(
            parentAddress,
            suri,
            parentPassword,
            name,
            password,
            genesisHash
        );
        return res;
    } catch (e) {
        throw new Error('invalid password');
    }
}

async function derivePathValidation(
    parentAddress: string,
    suri: string,
    parentPassword: string
): Promise<{ address: string; suri: string }> {
    try {
        const res = await validateDerivePath(
            parentAddress,
            parentPassword,
            suri
        );
        return res;
    } catch (e) {
        throw new Error('invalid derivation path');
    }
}

async function validateAccount(
    address: string,
    password: string
): Promise<boolean> {
    const result = await validateAccountMessage(address, password);
    return result;
}

async function deleteAccount(address: string): Promise<boolean> {
    console.log('Delete account working');
    const result = await forgetAccount(address);
    console.log('Delete account res ===>>', result);
    return result;
}

async function renameAccount(address: string, name: string): Promise<boolean> {
    console.log('rename account working');
    const result = await editAccount(address, name);
    console.log('New account name', result);
    return result;
}

export default {
    GenerateSeedPhrase,
    AccountCreation,
    createAccountFromJSON,
    validatingSeedPhrase,
    getJsonBackup,
    derive,
    validateAccount,
    deleteAccount,
    renameAccount,
    derivePathValidation,
    signTransaction,
};
