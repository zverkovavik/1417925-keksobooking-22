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
// подумать над оптимизацией


export { goActive };
