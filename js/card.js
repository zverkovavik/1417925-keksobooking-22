import { createApartments } from './data.js';

const BuildingTypes = {
  'flat': 'Квартира',
  'palace': 'Дворец',
  'house': 'Дом',
  'bungalow': 'Бунгало',
}

const similarApartments = createApartments();
const similarListFragment = document.createDocumentFragment();
const cardTemplate = document.querySelector('#card').content;
const mapCanvas = document.querySelector('#map-canvas');

const createApartmentAd = ( {author: {avatar}, offer: { title, address, price, type, guests, rooms, checkin, checkout, features, photos, description }}) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = BuildingTypes[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${guests} комнаты для ${rooms} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardElement.querySelector('.popup__features').textContent = features;
  cardElement.querySelector('.popup__description').textContent = description;
  const popupPhotos = cardElement.querySelector('.popup__photos');
  const popupPhoto = cardElement.querySelector('.popup__photo');
  popupPhotos.removeChild(popupPhoto);

  for (let i = 0; i < photos.length; i++) {
    const img = popupPhoto.cloneNode(true);
    let newPhotoPlace = popupPhotos.appendChild(img);
    newPhotoPlace.src = photos[i];
  }

  cardElement.querySelector('.popup__avatar').src = avatar;
  similarListFragment.appendChild(cardElement);
};

createApartmentAd(similarApartments[0]);
mapCanvas.appendChild(similarListFragment);

