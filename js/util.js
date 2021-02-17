const getRandomInteger = (min, max) => {

  min = Math.ceil(min);
  max = Math.floor(max);

  if (min > max || min < 0 || min === max || max < 0) {
    throw 'Задан неверный диапазон';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, numbersAfterFloat = 5) => {
  if (min > max || min < 0 || min === max || max < 0 || numbersAfterFloat > 20) {
    throw 'Задан неверный диапазон';
  }
  let randomFloat = Math.random() * (max - min + 1) + min;
  return Number(randomFloat.toFixed(numbersAfterFloat));
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

// алгоритм тасования Фишера-Йетса
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomArray = (elements) => {
  const shuffledArray = shuffle(elements.slice());
  shuffledArray.length = getRandomInteger(1, elements.length);
  return shuffledArray;
};

export { getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray };
