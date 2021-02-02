
const getRandomInteger = (min, max) => {

  min = Math.ceil(min);
  max = Math.floor(max);

  if (min > max || min < 0 || min === max || max < 0) {
    return 'The wrong range!';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInteger(2, 4);
getRandomInteger(2, 17);
getRandomInteger(-1, 4);
getRandomInteger(2, 2);
getRandomInteger(6, 4);
getRandomInteger(2.5, 3);

const getRandomFloat = (min, max, numbersAfterFloat = 1) => {
  if (min > max || min < 0 || min === max || max < 0 || numbersAfterFloat > 20) {
    return 'The wrong range!';
  }
  let randomFloat = Math.random() * (max - min + 1) + min;
  return randomFloat.toFixed(numbersAfterFloat);
};

getRandomFloat(1, 4, 7);
getRandomFloat(5.465457, 17, 4);
getRandomFloat(-1, 4, 7);
getRandomFloat(2, 2, 22);
getRandomFloat(6, 4, 3);
getRandomFloat(2.545657, 3, 2);
getRandomFloat(2.545657, 9);
