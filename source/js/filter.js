import { closePopup, removeMarkers, renderMapMarkers } from './map.js';
import { debounce } from './utils.js';

const filterForm = document.querySelector('.map__filters');
const housingTypeFilter = document.querySelector('#housing-type');
const housingPriceFilter = document.querySelector('#housing-price');
const housingRoomFilter = document.querySelector('#housing-rooms');
const housingGuestFilter = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');
const FILTER_DELAY = 500;
const buildingTypes = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const ApartmentPrice = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const ApartmentPriceLevel = {
  LOW: 10000,
  HIGH: 50000,
};

const guestNumbers = ['1', '2', '0'];
const roomNumbers = ['1', '2', '3'];

const filterApartmentsByBuildingType  = (response) => {
  if (buildingTypes.includes(housingTypeFilter.value)) {
    response = response.filter((element) => element.offer.type ===  housingTypeFilter.value);
  }
  return response;
};

const filterApartmentsByPrice = (response) => {
  switch (housingPriceFilter.value) {
    case ApartmentPrice.MIDDLE:
      response = response.filter((element) => element.offer.price >= ApartmentPriceLevel.LOW && element.offer.price <= ApartmentPriceLevel.HIGH);
      break;
    case ApartmentPrice.LOW:
      response = response.filter((element) => element.offer.price < ApartmentPriceLevel.LOW);
      break;
    case ApartmentPrice.HIGH:
      response = response.filter((element) => element.offer.price > ApartmentPriceLevel.HIGH);
      break;
    default: response;
  }
  return response;
};

const filterApartmentsByRoomNumber = (response) => {
  if (roomNumbers.includes(housingRoomFilter.value)) {
    response = response.filter((element) => element.offer.rooms === Number(housingRoomFilter.value));
  }
  return response;
};

const filterApartmentsByGuestNumber = (response) => {
  if (guestNumbers.includes(housingGuestFilter.value)) {
    response = response.filter((element) => element.offer.guests === Number(housingGuestFilter.value));
  }
  return response;
};

const hasAllFeatures = (element) => {
  const chosenFeatures = Array.from(housingFeatures.querySelectorAll('input[type=checkbox]:checked'));
  for (let feature of chosenFeatures) {
    if (!element.offer.features.includes(feature.defaultValue)) {
      return false;
    }
  }
  return true;
};

const filterApartmentsByFeatures = (response) => {
  response = response.filter((element) =>  hasAllFeatures(element))
  return response;
};

const onFilterChange = (serverData) => {
  filterForm.addEventListener('change', debounce(() => {
    let response = serverData.slice(0, serverData.length);
    response = filterApartmentsByBuildingType(response);
    response = filterApartmentsByPrice(response);
    response = filterApartmentsByRoomNumber(response);
    response = filterApartmentsByGuestNumber(response);
    response = filterApartmentsByFeatures(response);
    closePopup();
    removeMarkers();
    renderMapMarkers(response);
  }, FILTER_DELAY));
  return serverData;
};

const onFilterFormReset = (serverData) => {
  filterForm.addEventListener('reset', () => {
    const response = serverData.slice(0, serverData.length);
    closePopup();
    removeMarkers();
    renderMapMarkers(response);
  })
}

export { onFilterChange, onFilterFormReset };
