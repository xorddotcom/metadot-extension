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
  console.log('RANDOM ARRAY', uniqueRandomArray);
  return uniqueRandomArray;
}

export default { arrayFromSeedSentence, arrayOfFourRandomNumbers };

// export default helpers;
