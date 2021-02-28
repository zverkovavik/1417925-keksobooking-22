const ERROR_GET_DATA_MESSAGE = 'Не удалось загрузить похожие объявления!';

const createGetRequest = (onSuccess, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      onSuccess(response);
    })
    .catch((response) => {
      onError(ERROR_GET_DATA_MESSAGE);
      const {statusText, status} = response;
      throw new Error(`${status} — ${statusText}`);
    })
}

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
