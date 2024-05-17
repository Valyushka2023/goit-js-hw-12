import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

//	Створення картки зображення:
export function createImageCard(image) {
  return `
    <div class="gallery-item">
      <a href="${image.largeImageURL}" class="gallery-link">
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" />
      </a>
      <div class="thumb-block">
        ${createInfoBlock('Likes', image.likes)}
        ${createInfoBlock('Views', image.views)}
        ${createInfoBlock('Comments', image.comments)}
        ${createInfoBlock('Downloads', image.downloads)}
      </div>
    </div>
  `;
}

function createInfoBlock(label, value) {
  return `
    <div class="block">
      <h2 class="title">${label}</h2>
      <p class="amount">${value}</p>
    </div>
  `;
}

//Оновлення галереї
export function updateGallery(images) {
  const galleryList = document.querySelector('.gallery');
  const cardsHTML = images.map(image => createImageCard(image)).join('');
  galleryList.insertAdjacentHTML('beforeend', cardsHTML);
}

//Повідомлення про помилку
export function showErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message,
  });
}

//Показ та приховання індикатора завантаження
export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'block';
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'none';
  }
}