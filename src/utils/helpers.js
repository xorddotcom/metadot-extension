function arrayFromSeedSentence(seed) {
  return seed.split(' ');
}

function arrayOfFourRandomNumbers() {
  let limit = 4;
  const amount = 3;
  const lowerBound = 0;
  const upperBound = 11;
  const uniqueRandomArray = [];

  if (amount > limit) limit = amount;

  while (uniqueRandomArray.length < limit) {
    const randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound) + lowerBound,
    );
    if (uniqueRandomArray.indexOf(randomNumber) === -1) {
      uniqueRandomArray.push(randomNumber);
    }
  }
  return uniqueRandomArray;
}

function shuffleItemsWithinArray(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    // eslint-disable-next-line no-plusplus
    currentIndex--;

    // And swap it with the current element.
    // eslint-disable-next-line no-param-reassign
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function addressModifier(address) {
  console.log('Helper', address);
  if (address) return `${address.slice(0, 5)}...${address.slice(address.length - 5, address.length)}`;
  return null;
}

function validateAddress(userPublicAddress, senderPublicAddress) {
  try {
    if (userPublicAddress === senderPublicAddress) {
      throw String('Address is matched from your public address');
    }
    return true;
  } catch (error) {
    return error;
  }
}

function validateAmount(userCurrentAmount, sendAmount) {
  try {
    if (userCurrentAmount < sendAmount) {
      console.log('hello------------------------');
      throw String('Amount is exceeding from your current balance');
    }
    return true;
  } catch (error) {
    return error;
  }
}

function isUserNameValid(username) {
  /*
    Usernames can only have:
    - Lowercase Letters (a-z)
    - Uppercase Letters (A-Z)
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
  // eslint-disable-next-line no-useless-escape
  const res = /^[a-zA-Z0-9_\.]+$/.exec(username);
  const valid = !!res;
  return valid;
}

const trimBalance = (value) => {
  console.log('Value', value);
  const val = value.toString();
  const trimmedValue = val.slice(0, (val.indexOf('.')) + 4);
  return trimmedValue;
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
};

// export default helpers;
