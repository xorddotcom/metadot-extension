import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';

// import { AccountsStore } from '@polkadot/extension-base/stores';

function GenerateSeedPhrase(): string {
    const seed = mnemonicGenerate(12);
    return seed;
}

function validatingSeedPhrase(seedPhrase: string): Promise<unknown> {
    const resp = true;

    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('foo');
        }, 300);
    });

    return myPromise;
}

function getJsonBackup(address: string, password: string): any {
    try {
        // message pass to get json backup
        const backupJson = 'temp';

        // ***Download JSON file***
        const fileName = 'backup';
        const data = JSON.stringify(backupJson);
        const blob = new Blob([data], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
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
}

// create account from seed phrase function
function AccountCreation(
    name: string,
    password: string,
    seed: string
): object | undefined {
    try {
        // message pass to create account
        return {};
    } catch (error) {
        console.log('ERROR IN AccountCreation', error);
    }
}

// derive account creation
function derive(
    parentAddress: string,
    suri: string,
    passwoord: string,
    metadata: object
): object | undefined {
    try {
        // message pass to derive an account
        return {};
    } catch (e) {
        throw new Error('invalid password');
    }
}

function validateAccount(address: string, password: string): boolean {
    // message pass to validate password
    return true;
}

export default {
    GenerateSeedPhrase,
    AccountCreation,
    validatingSeedPhrase,
    getJsonBackup,
    derive,
    validateAccount,
};
