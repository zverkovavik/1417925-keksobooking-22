import { closePopup, removeMarkers, renderMapMarkers } from './map.js';

const housingTypeFilter = document.querySelector('#housing-type');

const onHouseFilterChange = (response) => {
  housingTypeFilter.addEventListener('change', () => {
    if (housingTypeFilter.value === 'any') {
      renderMapMarkers(response);
    } else {
      const arr = response.filter((element) => element.offer.type === housingTypeFilter.value);
      closePopup();
      removeMarkers();
      renderMapMarkers(arr);
    }
  })
};

export { onHouseFilterChange };

