import { getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray } from './util.js';

const PROPOSAL_TITLES = [
  'Ты нашел апартаменты мечты',
  'Уютная локация у моря',
  'Резиденция президента',
  'Жильё для интроверта',
  'Чувствуйте себя как дома!',
];
const CHECKIN_CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];
const APARTMENT_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const APARTMENT_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const APARTMENT_DESCRIPTIONS = [
  'с видом на море',
  'для компании',
  'для двоих',
  'идеально подходят для отдыха с детьми',
];
const URL_APARTMENT_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const APARTMENT_COUNT = 10;

const createApartment = () => {
  let locationX = getRandomFloat(35.65000, 35.70000);
  let locationY = getRandomFloat(139.70000, 139.80000);
  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(1, 8)}.png`,
    },
    offer: {
      title: getRandomArrayElement(PROPOSAL_TITLES),
      address: `${locationX}, ${locationY}`,
      price: getRandomInteger(25, 250),
      type: getRandomArrayElement(APARTMENT_TYPES),
      rooms: getRandomInteger(1, 25),
      guests: getRandomInteger(1, 50),
      checkin: getRandomArrayElement(CHECKIN_CHECKOUTS),
      checkout: getRandomArrayElement(CHECKIN_CHECKOUTS),
      features: getRandomArray(APARTMENT_FEATURES),
      description: `Апартаменты ${getRandomArrayElement(APARTMENT_DESCRIPTIONS)}`,
      photos: getRandomArray(URL_APARTMENT_PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  }
};

new Array(APARTMENT_COUNT).fill('').map(() => createApartment());
