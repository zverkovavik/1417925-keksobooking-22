const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const avatarPreviewImg = avatarPreview.querySelector('img');
const apartmentFileChooser = document.querySelector('.ad-form__upload input[type=file]');
const apartmentPhoto = document.querySelector('.ad-form__photo');
const apartmentPhotoImg = document.createElement('img');
apartmentPhoto.append(apartmentPhotoImg);
const FIRST_ELEMENT = 0;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMAGE_SIZE = 70;

const addPhoto = (inputTypeFile, photoPreviewPlace) => {
  const photo = inputTypeFile.files[FIRST_ELEMENT];
  const fileName = photo.name.toLowerCase();
  const isImage = FILE_TYPES.some((fileFormat) => {
    return fileName.endsWith(fileFormat);
  });

  if (isImage) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      photoPreviewPlace.width = IMAGE_SIZE;
      photoPreviewPlace.height = IMAGE_SIZE;
      photoPreviewPlace.src = reader.result;

    });
    reader.readAsDataURL(photo);
  }
};

avatarFileChooser.addEventListener('change', () => {
  addPhoto(avatarFileChooser, avatarPreviewImg);
  avatarPreview.style.padding = '0';
});

apartmentFileChooser.addEventListener('change', () => {
  addPhoto(apartmentFileChooser, apartmentPhotoImg);
});
