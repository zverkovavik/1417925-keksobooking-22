import { onAdFormReset, onFilterChange } from './filter.js';

const ERROR_GET_DATA_MESSAGE = 'Не удалось загрузить похожие объявления!';
const GET_REQUEST_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_REQUEST_URL = 'https://22.javascript.pages.academy/keksobooking';

const makeGetRequest = (onSuccess, onError) => {
  fetch(GET_REQUEST_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        const {statusText, status} = response;
        throw new Error(`${status} — ${statusText}`);
      }
    })
    .then(onSuccess)
    .then(onFilterChange)
    .then(onAdFormReset)
    .catch(() => {
      onError(ERROR_GET_DATA_MESSAGE);
    })
};

const makePostRequest = (data, onSuccess, onError) => {
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

export { makeGetRequest, makePostRequest };
