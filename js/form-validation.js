/*Валидации */
const housingType = document.querySelector('#type');
const apartmentPrice = document.querySelector('#price');
const timeForm = document.querySelector('.ad-form__element--time');
const checkInTime = document.querySelector('#timein');
const checkOutTime = document.querySelector('#timeout');
const titleAd = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const guestsNumber = document.querySelector('#capacity');
const BuildingMinPrices = {
  bungalow: '0',
  flat: '1000',
  house: '5000',
  palace: '10000',
}


housingType.addEventListener('change', () => {
  switch (housingType.value) {
    case 'bungalow':
      apartmentPrice.setAttribute('min', BuildingMinPrices.bungalow);
      apartmentPrice.setAttribute('placeholder', BuildingMinPrices.bungalow);
      break;
    case 'flat':
      apartmentPrice.setAttribute('min', BuildingMinPrices.flat);
      apartmentPrice.setAttribute('placeholder', BuildingMinPrices.flat);
      break;
    case 'house':
      apartmentPrice.setAttribute('min', BuildingMinPrices.house);
      apartmentPrice.setAttribute('placeholder', BuildingMinPrices.house);
      break;
    case 'palace':
      apartmentPrice.setAttribute('min', BuildingMinPrices.palace);
      apartmentPrice.setAttribute('placeholder', BuildingMinPrices.palace);
      break;
  }
});

timeForm.addEventListener('change', (evt) => {
  checkInTime.value = evt.target.value;
  checkOutTime.value = evt.target.value;
});

titleAd.addEventListener('input', () => {
  if (titleAd.validity.tooLong) {
    titleAd.setCustomValidity('Длина заголовка объявления не более 100 символов.');
  } else if (titleAd.validity.tooShort) {
    titleAd.setCustomValidity('Длина заголовка объявления не менее 30 символов.')
  } else if (titleAd.validity.valueMissing) {
    titleAd.setCustomValidity('Это обязательное поле.')
  } else {
    titleAd.setCustomValidity('');
  }
  titleAd.reportValidity();
});

apartmentPrice.addEventListener('input', () => {
  if (apartmentPrice.validity.valueMissing) {
    apartmentPrice.setCustomValidity('Это обязательное поле.');
  } else if (apartmentPrice.validity.rangeOverflow) {
    apartmentPrice.setCustomValidity('Максимальная цена - 1 000 000.');
  } else {
    apartmentPrice.setCustomValidity('');
  }
  apartmentPrice.reportValidity();
});


roomNumber.addEventListener('click', () => {
  if (roomNumber.value === '1') {
    for (let i = 0; i < guestsNumber.children.length; i++) {
      guestsNumber.children[i].setAttribute('disabled', 'disabled');
    }
    guestsNumber.children[guestsNumber.children.length - 2].removeAttribute('disabled');
    guestsNumber.children[guestsNumber.children.length - 2].setAttribute('selected', 'selected');
  } else if (roomNumber.value === '100') {
    for (let i = 0; i < guestsNumber.children.length; i++) {
      guestsNumber.children[i].setAttribute('disabled', 'disabled');
    }
    guestsNumber.children[guestsNumber.children.length - 1].removeAttribute('disabled');
    guestsNumber.children[guestsNumber.children.length - 1].setAttribute('selected', 'selected');
  } else if (roomNumber.value === '2') {
    for (let i = 1; i <= roomNumber.value; i++) {
      guestsNumber.children[i].removeAttribute('disabled');
    }
    guestsNumber.children[0].setAttribute('disabled', 'disabled');
    guestsNumber.children[guestsNumber.children.length - 1].setAttribute('disabled', 'disabled');
  } else {
    for (let i = 0; i < roomNumber.value; i++) {
      guestsNumber.children[i].removeAttribute('disabled');
    }
    guestsNumber.children[guestsNumber.children.length - 1].setAttribute('disabled', 'disabled');
  }
});
