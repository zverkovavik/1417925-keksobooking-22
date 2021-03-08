/* global L:readonly */
import { createApartmentAd } from './card.js';
import { goActive } from './form-state.js';
import { createGetRequest } from './api.js';
import { showAlert } from './utils.js';

const map = L.map('map-canvas')
  .on('load', () => {
    goActive();
  })
  .setView({
    lat: 35.6894,
    lng: 139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

const mainIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: 35.681700,
    lng: 139.753882,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
).addTo(map);

mainMarker.on('move', (evt) => {
  let chosenAddress = evt.target.getLatLng();
  const address = document.querySelector('#address');
  address.value = `${(chosenAddress.lat).toFixed(5)}, ${(chosenAddress.lng).toFixed(5)}`;
});

const renderMapMarkers = (serverData) => {
  serverData.forEach((element) => {
    const {location: {lat, lng}} = element;
    const apartmentAddressIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [34, 34],
      iconAnchor: [17, 34],
    });

    const apartmentAddressMarker = L.marker(
      {
        lat: lat,
        lng: lng,
      },
      { icon: apartmentAddressIcon},
    ).addTo(map);

    apartmentAddressMarker.bindPopup(
      createApartmentAd(element),
      {
        keepInView: true,
      },
    );
  });
}

createGetRequest(renderMapMarkers, showAlert);

export { mainMarker };
