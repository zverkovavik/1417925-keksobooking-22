/*Взаимодействие с формой при отправке */
import { createPostRequest } from './api.js';
import { mainMarker } from './map.js';
import { isEscEvent } from './utils.js';

const adForm = document.querySelector('.ad-form');
const successSubmitFormMessage = document.querySelector('#success').content.querySelector('.success');
const errorFormMessage = document.querySelector('#error').content.querySelector('.error');
const mainBlock = document.querySelector('main');
const errorButton = errorFormMessage.querySelector('.error__button');
const sectionForm = document.querySelector('.notice');
const popupBlock = document.createDocumentFragment();
const additionalDiv = document.createElement('div');
additionalDiv.classList.add('additional');

const closePopup = () => {
  additionalDiv.classList.add('hidden');
}

const closePopupByClick = () => {
  closePopup();
  mainBlock.removeEventListener('click', closePopupByClick);
}

const closePopupByEsc = () => {
  closePopup();
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const onPopupEscKeydown = (evt) => {
  if (isEscEvent) {
    evt.preventDefault();
    closePopupByEsc();
  }
};

const closePopupByErrorButton = () => {
  closePopup();
  errorButton.removeEventListener('click', closePopupByErrorButton);
}

const showPopup = (message) => {
  //проверка на наличие сообщения об ошибке/успехе в разметке
  if (sectionForm.contains(additionalDiv)) {
    additionalDiv.querySelector('div').remove();
    additionalDiv.classList.remove('hidden');
  }
  document.addEventListener('keydown', onPopupEscKeydown);
  mainBlock.addEventListener('click', closePopupByClick);
  additionalDiv.appendChild(message);
  popupBlock.appendChild(additionalDiv);
  sectionForm.appendChild(popupBlock);
}

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  createPostRequest(
    formData,
    () => {
      showPopup(successSubmitFormMessage);
      adForm.reset();
      mainMarker.setLatLng({
        lat: 35.68170,
        lng: 139.75388,
      });
    },
    () => {
      showPopup(errorFormMessage);
      errorButton.addEventListener('click', closePopupByErrorButton);
    });

})
