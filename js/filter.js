/* global _:readonly */
import { closePopup, removeMarkers, renderMapMarkers } from './map.js';
const RERENDER_DELAY = 500;
const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeFilter = document.querySelector('#housing-type');
const housingPriceFilter = document.querySelector('#housing-price');
const housingRoomFilter = document.querySelector('#housing-rooms');
const housingGuestFilter = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');

const buildingTypes = [
  'palace',
  'flat',
  'house',
  'bungalow'];

const ApartmentPrices = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
}

const ApartmentPriceLevels = {
  LOW_LEVEL: 10000,
  HIGH_LEVEL: 50000,
}

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
    case ApartmentPrices.MIDDLE:
      response = response.filter((element) => element.offer.price >= ApartmentPriceLevels.LOW_LEVEL && element.offer.price <= ApartmentPriceLevels.HIGH_LEVEL);
      break;
    case ApartmentPrices.LOW:
      response = response.filter((element) => element.offer.price < ApartmentPriceLevels.LOW_LEVEL);
      break;
    case ApartmentPrices.HIGH:
      response = response.filter((element) => element.offer.price > ApartmentPriceLevels.HIGH_LEVEL);
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
  let chosenFeatures = Array.from(housingFeatures.querySelectorAll('input[type=checkbox]:checked'));
  for (let feature of chosenFeatures) {
    if (!element.offer.features.includes(feature.defaultValue)) {
      return false;
    }
  }
  return true;
}

const filterApartmentsByFeatures = (response) => {
  response = response.filter((element) =>  hasAllFeatures(element) === true)
  return response;
};

const onFilterChange = (serverData) => {
  mapFiltersForm.addEventListener('change', () => {
    let response = serverData.slice(0, serverData.length);
    response = filterApartmentsByBuildingType(response);
    response = filterApartmentsByPrice(response);
    response = filterApartmentsByRoomNumber(response);
    response = filterApartmentsByGuestNumber(response);
    response = filterApartmentsByFeatures(response);
    closePopup();
    removeMarkers();
    _.debounce(
      renderMapMarkers(response),
      RERENDER_DELAY,
    );
  })
}

export { onFilterChange };
