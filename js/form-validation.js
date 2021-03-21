const housingType = document.querySelector('#type');
const apartmentPrice = document.querySelector('#price');
const timeForm = document.querySelector('.ad-form__element--time');
const checkInTime = document.querySelector('#timein');
const checkOutTime = document.querySelector('#timeout');
const titleAd = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const guestsNumber = document.querySelector('#capacity');
const BuildingType = {
  FLAT: 'flat',
  BUNGALOW: 'bungalow',
  HOUSE: 'house',
  PALACE: 'palace',
};

const BuildingMinimalPrice = {
  BUNGALOW: '0',
  FLAT: '1000',
  HOUSE: '5000',
  PALACE: '10000',
};

const RoomQuantity = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  HUNDRED: '100',
}

const availableGuestCount = guestsNumber.children;

housingType.addEventListener('change', () => {
  switch (housingType.value) {
    case BuildingType.BUNGALOW:
      apartmentPrice.setAttribute('min', BuildingMinimalPrice.BUNGALOW);
      apartmentPrice.setAttribute('placeholder', BuildingMinimalPrice.BUNGALOW);
      break;
    case BuildingType.FLAT:
      apartmentPrice.setAttribute('min', BuildingMinimalPrice.FLAT);
      apartmentPrice.setAttribute('placeholder', BuildingMinimalPrice.FLAT);
      break;
    case BuildingType.HOUSE:
      apartmentPrice.setAttribute('min', BuildingMinimalPrice.HOUSE);
      apartmentPrice.setAttribute('placeholder', BuildingMinimalPrice.HOUSE);
      break;
    case BuildingType.PALACE:
      apartmentPrice.setAttribute('min', BuildingMinimalPrice.PALACE);
      apartmentPrice.setAttribute('placeholder', BuildingMinimalPrice.PALACE);
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

const synchronizeRoomAndGuestNumber = () => {
  switch (roomNumber.value) {
    case RoomQuantity.ONE:
      for (let i = 0; i < availableGuestCount.length; i++) {
        availableGuestCount[i].setAttribute('disabled', 'disabled');
      }
      availableGuestCount[availableGuestCount.length - 2].removeAttribute('disabled');
      availableGuestCount[availableGuestCount.length - 2].setAttribute('selected', 'selected');
      break;
    case RoomQuantity.HUNDRED:
      for (let i = 0; i < availableGuestCount.length; i++) {
        availableGuestCount[i].setAttribute('disabled', 'disabled');
      }
      availableGuestCount[availableGuestCount.length - 1].removeAttribute('disabled');
      availableGuestCount[availableGuestCount.length - 1].setAttribute('selected', 'selected');
      break;
    case RoomQuantity.TWO:
      for (let i = 1; i <= roomNumber.value; i++) {
        availableGuestCount[i].removeAttribute('disabled');
      }
      availableGuestCount[0].setAttribute('disabled', 'disabled');
      availableGuestCount[availableGuestCount.length - 1].setAttribute('disabled', 'disabled');
      break;
    case RoomQuantity.THREE:
      for (let i = 0; i < roomNumber.value; i++) {
        availableGuestCount[i].removeAttribute('disabled');
      }
      availableGuestCount[availableGuestCount.length - 1].setAttribute('disabled', 'disabled');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  synchronizeRoomAndGuestNumber();
})

roomNumber.addEventListener('click', () => {
  synchronizeRoomAndGuestNumber();
});
