// import constants from '../constants/onchain';

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

function addressModifier(address: string): string | undefined {
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
): boolean | unknown {
    try {
        if (userPublicAddress === senderPublicAddress) {
            throw String('Address is matched from your public address');
        }
        return true;
    } catch (error) {
        return error;
    }
}

function validateAmount(
    userCurrentAmount: number,
    sendAmount: number
): boolean | unknown {
    try {
        if (userCurrentAmount < sendAmount) {
            throw String('Amount is exceeding from your current balance');
        }
        return true;
    } catch (error) {
        return error;
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

// async function getKSM() {
//     let amm;
//     await fetch(constants.USD_PER_KSM_API)
//         .then((response) => response.json())
//         .then((data) => {
//             amm = data;
//         });
//     return amm;
// }

// async function getDOT() {
//     let amm;
//     await fetch(constants.USD_PER_POLKADOT_API)
//         .then((response) => response.json())
//         .then((data) => {
//             amm = data;
//         });
//     return amm;
// }

// async function convertIntoUsd(token, amountToConvert) {
//     let converted = 0;
//     if (token === 'KSM') {
//         const oneKSMintoUsd = await getKSM();
//         converted = (
//             Number(amountToConvert) * oneKSMintoUsd.kusama.usd
//         ).toFixed(3);
//     } else if (token === 'DOT') {
//         const oneDOTIntoUsd = await getDOT();
//         converted = (
//             Number(amountToConvert) * oneDOTIntoUsd.polkadot.usd
//         ).toFixed(3);
//     }
//     return converted;
// }

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

export default {
    arrayFromSeedSentence,
    arrayOfFourRandomNumbers,
    shuffleItemsWithinArray,
    addressModifier,
    isUserNameValid,
    validateAddress,
    validateAmount,
    trimBalance,
    // convertIntoUsd,
    // showInternetSnackBar,
};
