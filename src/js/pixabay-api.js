import axios from 'axios';

//	Отримання зображень з Pixabay
const API_KEY = '43767722-bbce12454ab409ccbfe76519c';
const BASE_URL = 'https://pixabay.com/api/';

export async function getPictures(searchTerm, page = 1) {
  if (searchTerm.includes(' ')) {
    searchTerm = searchTerm.replace(/\s+/g, '+');
  }

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.statusText);
  }
}