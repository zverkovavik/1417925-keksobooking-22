const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const buildingType = {
  'flat': 'Квартира',
  'palace': 'Дворец',
  'house': 'Дом',
  'bungalow': 'Бунгало',
};

const createApartmentAd = ({author: {avatar}, offer: { address, checkin, checkout, description, features, guests, photos, price, rooms, title, type }}) => {

  const similarListFragment = document.createDocumentFragment();
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = buildingType[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardElement.querySelector('.popup__features').textContent = features;
  cardElement.querySelector('.popup__description').textContent = description;
  const popupPhotos = cardElement.querySelector('.popup__photos');
  const popupPhoto = cardElement.querySelector('.popup__photo');
  popupPhotos.removeChild(popupPhoto);

  if (!photos.length) {
    popupPhotos.classList.add('hidden');
  }

  for (let photo of photos) {
    const img = popupPhoto.cloneNode(true);
    let newPhotoPlace = popupPhotos.appendChild(img);
    newPhotoPlace.src = photo;
  }
  cardElement.querySelector('.popup__avatar').src = avatar;
  const cardElementArray = Array.from(cardElement.children);
  for (let element of cardElementArray) {
    if (!element.childNodes.length && !element.getAttribute('src')) {
      element.classList.add('hidden');
    }
  }

  return similarListFragment.appendChild(cardElement);
};

export { createApartmentAd };
