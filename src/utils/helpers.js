function arrayFromSeedSentence(seed) {
  return seed.split(' ');
}

function arrayOfFourRandomNumbers() {
  var limit = 4,
    amount = 3,
    lower_bound = 0,
    upper_bound = 11,
    unique_random_numbers = [];

  if (amount > limit) limit = amount;

  while (unique_random_numbers.length < limit) {
    var random_number = Math.floor(
      Math.random() * (upper_bound - lower_bound) + lower_bound,
    );
    if (unique_random_numbers.indexOf(random_number) == -1) {
      unique_random_numbers.push(random_number);
    }
  }
  console.log('RANDOM ARRAY', unique_random_numbers);
  return unique_random_numbers;
}

export default { arrayFromSeedSentence, arrayOfFourRandomNumbers };

// export default helpers;
