const housingType = document.querySelector('#type');
const apartmentPrice = document.querySelector('#price');
const timeForm = document.querySelector('.ad-form__element--time');
const checkInTime = document.querySelector('#timein');
const checkOutTime = document.querySelector('#timeout');
const titleAd = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const guestsNumber = document.querySelector('#capacity');
const availableGuestCount = guestsNumber.children;
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
};

const setMinimalPriceOnBuildingType = () => {
  switch (housingType.value) {
    case BuildingType.BUNGALOW:
      apartmentPrice.setAttribute('min', BuildingMinimalPrice.BUNGALOW);
      apartmentPrice.setAttribute('placeholder', BuildingMinimalPrice.BUNGALOW);
      break;
    case BuildingType.HOUSE:
      apartmentPrice.setAttribute('min', BuildingMinimalPrice.HOUSE);
      apartmentPrice.setAttribute('placeholder', BuildingMinimalPrice.HOUSE);
      break;
    case BuildingType.PALACE:
      apartmentPrice.setAttribute('min', BuildingMinimalPrice.PALACE);
      apartmentPrice.setAttribute('placeholder', BuildingMinimalPrice.PALACE);
      break;
    default:
      apartmentPrice.setAttribute('min', BuildingMinimalPrice.FLAT);
      apartmentPrice.setAttribute('placeholder', BuildingMinimalPrice.FLAT);
  }
};

housingType.addEventListener('change', () => {
  setMinimalPriceOnBuildingType();
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
    case RoomQuantity.HUNDRED:
      for (let element of availableGuestCount) {
        if (Number(element.value)) {
          element.setAttribute('disabled', 'disabled');
        } else {
          element.removeAttribute('disabled');
          element.setAttribute('selected', 'selected');
        }
      }
      break;
    default:
      for (let element of availableGuestCount) {
        element.removeAttribute('selected');
        if (!Number(element.value) || element.value > roomNumber.value) {
          element.setAttribute('disabled', 'disabled');
        } else {
          element.removeAttribute('disabled');
          if (element.value === roomNumber.value) {
            element.setAttribute('selected', 'selected');
          }
        }
      }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  synchronizeRoomAndGuestNumber();
  setMinimalPriceOnBuildingType();
});

roomNumber.addEventListener('change', () => {
  synchronizeRoomAndGuestNumber();
});

export { synchronizeRoomAndGuestNumber, setMinimalPriceOnBuildingType };
