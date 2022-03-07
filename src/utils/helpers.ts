import constants from '../constants/onchain';

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
    console.log(
        'Validate address running',
        userPublicAddress,
        senderPublicAddress
    );
    if (userPublicAddress === senderPublicAddress) {
        console.log('Address matched');
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
    const val = value.toString();
    const trimmedValue = val.slice(0, val.indexOf('.') + 4);
    return trimmedValue;
};

async function getKSM(): Promise<any> {
    let amm;
    await fetch(constants.USD_PER_KSM_API)
        .then((response) => response.json())
        .then((data) => {
            amm = data;
        });
    return amm;
}

async function getDOT(): Promise<any> {
    let amm;
    await fetch(constants.USD_PER_POLKADOT_API)
        .then((response) => response.json())
        .then((data) => {
            amm = data;
        });
    return amm;
}

async function getASTR(): Promise<any> {
    console.log('Get astar running');
    let amm;
    await fetch(constants.USD_PER_ASTAR_API)
        .then((response) => response.json())
        .then((data) => {
            amm = data;
        });
    console.log('Amm [][]', amm);
    return amm;
}

async function getSDN(): Promise<any> {
    let amm;
    await fetch(constants.USD_PER_SHIDEN_API)
        .then((response) => response.json())
        .then((data) => {
            amm = data;
        });
    return amm;
}

async function getKAR(): Promise<any> {
    let amm;
    await fetch(constants.USD_PER_KARURA_API)
        .then((response) => response.json())
        .then((data) => {
            amm = data;
        });
    return amm;
}

async function convertIntoUsd(
    token: string,
    amountToConvert: number
): Promise<number> {
    let converted = 0;
    console.log('Token ====>>>', token);
    if (token === 'KSM') {
        const oneKSMintoUsd = await getKSM();
        converted = Number(
            (Number(amountToConvert) * oneKSMintoUsd.kusama.usd).toFixed(3)
        );
    } else if (token === 'DOT') {
        const oneDOTIntoUsd = await getDOT();
        converted = Number(
            (Number(amountToConvert) * oneDOTIntoUsd.polkadot.usd).toFixed(3)
        );
    } else if (token === 'ASTR') {
        const oneASTRintoUsd = await getASTR();
        converted = Number(
            (Number(amountToConvert) * oneASTRintoUsd.astar.usd).toFixed(3)
        );
    } else if (token === 'SDN') {
        const oneSDNintoUsd = await getSDN();
        converted = Number(
            (Number(amountToConvert) * oneSDNintoUsd.astar.usd).toFixed(3)
        );
    } else if (token === 'KAR') {
        const oneKARintoUsd = await getKAR();
        converted = Number(
            (Number(amountToConvert) * oneKARintoUsd.karura.usd).toFixed(3)
        );
    }
    console.log('Converted ===>>', converted);
    return converted;
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
    // showInternetSnackBar,
};
