import { getPictures } from './js/pixabay-api.js';
import { updateGallery, showErrorMessage, showLoader, hideLoader } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

//Ініціалізація SimpleLightbox:
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlay: true,
  close: true,
  className: 'custom-lightbox',
});

//Основні змінні 
const searchForm = document.querySelector('.js-search');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-load-more');
const upBtn = document.querySelector('.up-btn');
const endLoader = document.querySelector('.end-loader');

let searchTerm = '';
let currentPage = 1;
let totalHits = 0;

//Обробник подій для форми пошуку
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  endLoader.style.display = 'none';
  searchTerm = event.target.elements.search.value.trim();
  currentPage = 1;

  if (!searchTerm) {
    showErrorMessage('Please enter a valid search term!');
    return;
  }

  fetchPictures();
});

//Обробник подій для кнопки "Load more"
loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  fetchPictures();
});

//Функція для отримання зображень
async function fetchPictures() {
  try {
    showLoader();
    loadMoreBtn.style.display = 'none';
    endLoader.style.display = 'none';

    const images = await getPictures(searchTerm, currentPage);

    hideLoader();
    if (currentPage === 1 && !images.hits.length) {
      showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    updateGallery(images.hits);
    lightbox.refresh();

    totalHits = images.totalHits;

    if (images.hits.length < 15 || totalHits <= currentPage * 15) {
      endLoader.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'block';
    }

    smoothScroll();
  } catch (error) {
    hideLoader();
    showErrorMessage('Something went wrong. Please try again.');
    console.error(error);
  }
}

//Функція плавного прокручування
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

//Обробник подій для кнопки прокручування вверх
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    upBtn.classList.add('show');
  } else {
    upBtn.classList.remove('show');
  }
});

upBtn.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});