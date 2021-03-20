import { onFilterChange } from './filter.js';
import { showAlert } from './utils.js';
import { renderMapMarkers } from './map.js';

const ERROR_GET_DATA_MESSAGE = 'Не удалось загрузить похожие объявления!';
const GET_REQUEST_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_REQUEST_URL = 'https://22.javascript.pages.academy/keksobooking';

const createGetRequest = (onSuccess, onError) => {
  fetch(GET_REQUEST_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        const {statusText, status} = response;
        throw new Error(`${status} — ${statusText}`);
      }
    })
    .then((response) => onSuccess(response))
    .then((response) => onFilterChange(response))
    .catch(() => {
      onError(ERROR_GET_DATA_MESSAGE);
    })
}
createGetRequest(renderMapMarkers, showAlert);

const createPostRequest = (data, onSuccess, onError) => {
  fetch(
    POST_REQUEST_URL,
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
