/* global L:readonly */
import { createApartmentAd } from './card.js';
import { goActive } from './form-state.js';

const APARTMENT_AD_COUNT = 10;
const DEFAULT_LATITUDE_MAIN_MARKER = 35.681700;
const DEFAULT_LONGITUDE_MAIN_MARKER = 139.753882;
const ZOOM = 10;
const LATITUDE_TOKYO = 35.6894;
const LONGITUDE_TOKYO = 139.692;

const map = L.map('map-canvas')
  .on('load', () => {
    goActive();
  })
  .setView({
    lat: LATITUDE_TOKYO,
    lng: LONGITUDE_TOKYO,
  }, ZOOM);

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
    lat: DEFAULT_LATITUDE_MAIN_MARKER,
    lng: DEFAULT_LONGITUDE_MAIN_MARKER,
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
  serverData.slice(0, APARTMENT_AD_COUNT).forEach((element) => {
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
  return serverData;
}

const closePopup = () => {
  map.closePopup();
}

const removeMarkers = () => {
  map.eachLayer((layer) => {
    if (layer.getElement) {
      layer.remove();
    }
    mainMarker.addTo(map);
  })
}

export { mainMarker, renderMapMarkers, closePopup, removeMarkers };

