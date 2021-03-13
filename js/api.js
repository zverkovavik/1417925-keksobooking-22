import {  onHouseFilterChange } from './filter.js';
import { showAlert } from './utils.js';
import { renderMapMarkers } from './map.js';
const ERROR_GET_DATA_MESSAGE = 'Не удалось загрузить похожие объявления!';

const createGetRequest = (onSuccess, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        const {statusText, status} = response;
        throw new Error(`${status} — ${statusText}`);
      }
    })
    .then((response) => onSuccess(response))
    .then(onHouseFilterChange)
    .catch(() => {
      onError(ERROR_GET_DATA_MESSAGE);
    })
}
createGetRequest(renderMapMarkers, showAlert);

const createPostRequest = (data, onSuccess, onError) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
        const {statusText, status} = response;
        throw new Error(`${status} — ${statusText}`);
      }
    })
};

export { createGetRequest, createPostRequest };
