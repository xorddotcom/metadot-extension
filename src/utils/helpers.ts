import { hexToU8a, isHex } from '@polkadot/util';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import constants from '../constants/onchain';
import addressMapper from './services';
// eslint-disable-next-line import/no-cycle
import { exponentConversion } from './index';

function arrayFromSeedSentence(seed: string): Array<string> {
    return seed.split(' ');
}

function arrayOfFourRandomNumbers(): Array<number> {
    let limit = 4;
    const amount = 3;
    const lowerBound = 0;
    const upperBound = 11;
    const uniqueRandomArray = [];

    if (amount > limit) limit = amount;

    while (uniqueRandomArray.length < limit) {
        const randomNumber = Math.floor(
            Math.random() * (upperBound - lowerBound) + lowerBound
        );
        if (uniqueRandomArray.indexOf(randomNumber) === -1) {
            uniqueRandomArray.push(randomNumber);
        }
    }
    return uniqueRandomArray;
}

function shuffleItemsWithinArray(array: Array<string>): Array<string> {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        // eslint-disable-next-line no-param-reassign
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

function addressModifier(address: string | undefined): string | undefined {
    if (address)
        return `${address.slice(0, 5)}...${address.slice(
            address.length - 5,
            address.length
        )}`;
    return undefined;
}

function validateAddress(
    userPublicAddress: string,
    senderPublicAddress: string
): string {
    if (userPublicAddress === senderPublicAddress) {
        return 'Address is matched from your public address';
    }
    return '';
}

function validateAmount(
    userCurrentAmount: number,
    sendAmount: number
): boolean {
    try {
        if (userCurrentAmount < sendAmount) {
            throw String('Amount is exceeding from your current balance');
        }
        return true;
    } catch (error) {
        return false;
    }
}

function isUserNameValid(username: string): boolean {
    const res = /^[a-zA-Z0-9_.]+$/.exec(username);
    const valid = !!res;
    return valid;
}

const trimBalance = (value: string | number): string => {
    const val = value ? value.toString() : '';
    const isDecimalExist = val.indexOf('.');
    let trimmedValue;
    if (isDecimalExist) {
        trimmedValue = val.slice(0, val.indexOf('.') + 4);
    } else {
        trimmedValue = val;
    }
    return trimmedValue;
};

async function convertIntoUsd(
    chainName: string,
    amount: number
): Promise<number> {
    try {
        const val = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${chainName}&vs_currencies=Usd`
        )
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
        return val[chainName.toLowerCase()].usd * amount;
    } catch (err) {
        return 0;
    }
}

// function showInternetSnackBar() {
//     // Get the snackbar DIV
//     const x = document.getElementById('snackbar');

//     // Add the "show" class to DIV
//     x.className = 'show';

//     // After 3 seconds, remove the show class from DIV
//     setTimeout(() => {
//         x.className = x.className.replace('show', '');
//     }, 3500);
// }

const trimContent = (value: number, noOfDigits: number): string => {
    const val = value.toString();
    const trimmedValue = val.slice(0, val.indexOf('.') + noOfDigits);
    return trimmedValue;
};

const getMonthName = (abc: any): string => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return months[abc.getMonth()];
};

const dateFormatter = (date?: string): string => {
    const dateToBe = date || '123';
    const abc = new Date(dateToBe);
    return `${getMonthName(
        abc
    )} ${abc.getDate()} at ${abc.toLocaleTimeString()}`;
};

const getOwnTabs = (): any => {
    return Promise.all(
        chrome.extension.getViews({ type: 'tab' }).map(
            (view) =>
                new Promise((resolve) =>
                    // eslint-disable-next-line no-promise-executor-return
                    view.chrome.tabs.getCurrent((tab) =>
                        resolve(
                            Object.assign(tab, {
                                url: view.location.href,
                            })
                        )
                    )
                )
        )
    );
};

const isTabViewOpened = async (url: string): Promise<boolean> => {
    const ownTabs = await getOwnTabs();
    const tabd = ownTabs.find((tab: any) => tab.url.includes(url));
    if (tabd) {
        return true;
    }
    return false;
};

const openOptions = async (url: string): Promise<void> => {
    const ownTabs = await getOwnTabs();
    const urlFormatching = `${chrome.extension.getURL('index.html')}`;
    const tabd = ownTabs.find((tab: any) => tab.url.includes(urlFormatching));
    const isTabOpen = await isTabViewOpened(urlFormatching);
    if (tabd && isTabOpen) {
        chrome.tabs.update(tabd.id, { active: true, url });
    } else {
        chrome.tabs.create({ url });
    }
};

const isValidAddressPolkadotAddress = (address: string): boolean => {
    try {
        encodeAddress(
            isHex(address) ? hexToU8a(address) : decodeAddress(address)
        );
        return true;
    } catch (err) {
        return false;
    }
};

const txMadeOrReceiveByUser = (
    extrinsic: any,
    section: any,
    method: any,
    userAddress: string,
    event: any
): { bool: boolean; method: string } => {
    if (
        event.event.section === 'balances' &&
        event.event.method === 'Transfer' &&
        (event.event.data[0].toString() === userAddress ||
            event.event.data[1].toString() === userAddress)
    ) {
        console.log('balance transfer method returning');
        console.log(
            event.event.data[0].toString(),
            event.event.data[1].toString(),
            userAddress
        );
        return { bool: true, method: 'transfer' };
    }
    if (
        section.toString() === 'utility' &&
        method.toString() === 'BatchCompleted'
    ) {
        const signer = extrinsic?.signer?.toString();

        const argsData = function (): any {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { args, meta, method } = extrinsic || {};
            const { args: argsDef } = meta;

            const result = args.map((arg: any, index: any) => {
                const { name, type } = argsDef[index];
                return {
                    name,
                    type,
                    method: method?.method,
                    section: method?.section,
                    value: arg.toJSON(),
                };
            });
            return result[0].value;
        };

        const result = argsData();

        let receiverArray = [];
        receiverArray = result.map((res: any) => {
            return res.args?.dest?.id?.toString();
        });
        if (signer === userAddress || receiverArray.includes(userAddress)) {
            console.log('utility batch completed method returning');
            return { bool: true, method: 'batch' };
        }

        return { bool: false, method: 'batch' };
    }
    return { bool: false, method: 'none' };
};

const formatExtrinsic = (
    extrinsic: any,
    userAddress: string,
    method: string,
    chainDecimal: number
): {
    accountFrom: string;
    accountTo: string[];
    amount: number[];
    hash: string;
    operation: string;
    status: boolean;
} => {
    const accountFrom = extrinsic?.signer?.toString();
    let accountTo = [];
    let amount = [];
    const hash = extrinsic?.hash?.toString();
    let operation = '';
    const status = true;

    if (method === 'transfer') {
        const args = function (): any {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { args, meta, method } = extrinsic || {};
            const { args: argsDef } = meta;
            const result = args.map((arg: any, index: any) => {
                const { name, type } = argsDef[index];
                return {
                    value: arg.toJSON(),
                };
            });
            return result;
        };
        const argsData = args();
        operation = accountFrom === userAddress ? 'Send' : 'Receive';

        accountTo = [argsData[0]?.value.id];
        amount = [
            exponentConversion(Number(argsData[1]?.value) / 10 ** chainDecimal),
        ];
        console.log(accountTo, amount);
        console.log('finish');
    }
    if (method === 'batch') {
        const args = function (): any {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { args, meta, method } = extrinsic || {};
            const { args: argsDef } = meta;
            const result = args.map((arg: any, index: any) => {
                const { name, type } = argsDef[index];
                return {
                    value: arg.toJSON(),
                };
            });
            return result[0].value;
        };
        const argsData = args();

        operation = accountFrom === userAddress ? 'Send' : 'Receive';
        console.log('start for batch');
        console.log(argsData);
        accountTo = argsData.map((res: any) => {
            return res.args?.dest?.id?.toString();
        });
        amount = argsData.map((res: any) => {
            const convertedAmount = exponentConversion(
                Number(res.args?.value) / 10 ** chainDecimal
            );
            return convertedAmount;
        });

        console.log(accountTo, amount);
        console.log('finish for batch');
    }

    return {
        accountFrom,
        accountTo,
        amount,
        hash,
        operation,
        status,
    };
};

export default {
    arrayFromSeedSentence,
    arrayOfFourRandomNumbers,
    shuffleItemsWithinArray,
    addressModifier,
    isUserNameValid,
    validateAddress,
    validateAmount,
    trimBalance,
    convertIntoUsd,
    trimContent,
    dateFormatter,
    openOptions,
    isTabViewOpened,
    isValidAddressPolkadotAddress,
    formatExtrinsic,
    txMadeOrReceiveByUser,
    // showInternetSnackBar,
};
