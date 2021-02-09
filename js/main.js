const PROPOSAL_TITLE = ['Ты нашел апартаменты мечты', 'Уютная локация у моря', 'Резиденция президента', 'Жильё для интроверта', 'Чувствуйте себя как дома!'];
const CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
const APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const APARTMENT_DESCRIPTIONS = ['с видом на море', 'для компании', 'для двоих', 'идеально подходят для отдыха с детьми'];
const URL_APARTMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const APARTMENT_COUNT = 10;

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
  shuffledArray.length = getRandomInteger(1, elements.length - 1);
  return shuffledArray.join(', ');
};

const createApartment = () => {
  let locationX = getRandomFloat(35.65000, 35.70000);
  let locationY = getRandomFloat(139.70000, 139.80000);
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png',
    },
    offer: {
      title: getRandomArrayElement(PROPOSAL_TITLE),
      address: locationX + (', ') + locationY,
      price: getRandomInteger(25, 250),
      type: getRandomArrayElement(APARTMENT_TYPES),
      rooms: getRandomInteger(1, 25),
      guests: getRandomInteger(1, 50),
      checkin: getRandomArrayElement(CHECKIN_CHECKOUT),
      checkout: getRandomArrayElement(CHECKIN_CHECKOUT),
      features: getRandomArray(APARTMENT_FEATURES),
      description: 'Апартаменты ' + getRandomArrayElement(APARTMENT_DESCRIPTIONS),
      photos: getRandomArray(URL_APARTMENT_PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  }
};

new Array(APARTMENT_COUNT).fill('').map(() => createApartment());
