const adForm = document.querySelector('.ad-form');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const filtersForm = document.querySelector('.map__filters');
const filterMapElements = filtersForm.querySelectorAll('.map__filter');
const mapFeature = filtersForm.querySelector('.map__features');

/* Переход в неактивное состояние */
const deactivatePage = () =>{
  adForm.classList.add('ad-form--disabled');
  adFormHeader.setAttribute('disabled', 'disabled');
  for (let element of adFormElements) {
    element.setAttribute('disabled', 'disabled');
  }
  filtersForm.classList.add('ad-form--disabled');
  mapFeature.setAttribute('disabled', 'disabled');
  for (let element of filterMapElements) {
    element.setAttribute('disabled', 'disabled');
  }
}
deactivatePage();

/* Переход в активное состояние */
const activatePage = () => {
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

export { activatePage };
