/* Переход в неактивное состояние формы: 1. Находим все элементы, которым присвоим disabled */
const adForm = document.querySelector('.ad-form');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');

adForm.classList.add('ad-form--disabled');
adFormHeader.setAttribute('disabled', 'disabled'); // возможна оптимизация через функцию, добавляющую аттрибут disabled
for (let element of adFormElements) {
  element.setAttribute('disabled', 'disabled');
}

/* Переход в неактивное состояние фильтров */
const filtersForm = document.querySelector('.map__filters');
const filterMapElements = filtersForm.querySelectorAll('.map__filter');
const mapFeature = filtersForm.querySelector('.map__features');

filtersForm.classList.add('ad-form--disabled'); // можно вынести в функцию
mapFeature.setAttribute('disabled', 'disabled');
for (let element of filterMapElements) {
  element.setAttribute('disabled', 'disabled');
}
/* Переход в активное состояние */
const goActive = () => {
  adForm.classList.remove('ad-form--disabled');
  filtersForm.classList.remove('ad-form--disabled');
  adFormHeader.removeAttribute('disabled');
  for (let element of adFormElements) {
    element.removeAttribute('disabled');
  }
  mapFeature.removeAttribute('disabled');
  for (let element of filterMapElements) {
    element.removeAttribute('disabled');
  }
}

export { goActive };
// подумать над оптимизацией

const housingType = document.querySelector('#type');
const apartmentPrice = document.querySelector('#price');

housingType.addEventListener('change', () => {
  switch (housingType.value) {
    case 'bungalow':
      apartmentPrice.setAttribute('min', '0');
      apartmentPrice.setAttribute('placeholder', '0');
      break;
    case 'flat':
      apartmentPrice.setAttribute('min', '1000');
      apartmentPrice.setAttribute('placeholder', '1000');
      break;
    case 'house':
      apartmentPrice.setAttribute('min', '5000');
      apartmentPrice.setAttribute('placeholder', '5000');
      break;
    case 'palace':
      apartmentPrice.setAttribute('min', '10000');
      apartmentPrice.setAttribute('placeholder', '10000');
      break;
  }
});
const timeForm = document.querySelector('.ad-form__element--time');
const checkInTime = document.querySelector('#timein');
const checkOutTime = document.querySelector('#timeout');

timeForm.addEventListener('change', (evt) => {
  checkInTime.value = evt.target.value;
  checkOutTime.value = evt.target.value;
});

//  для следующего задания
// const roomQuantity = document.querySelector('#room_number');
// const guestsQuantity = document.querySelector('#capacity');

