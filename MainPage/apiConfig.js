let pageNumber = 1;

const popularMoviesUrl = (page) =>
  `${baseUrl}movie/popular${apiKey}&page=${page}`;

const searchMoviesUrl = (value) =>
  `${baseUrl}search/movie${apiKey}&query=${value}`;

const IMG_PATH = (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`;

const originalImage = (imgPath) =>
  `https://image.tmdb.org/t/p/original/${imgPath}`;

const getMovies = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
  } catch (err) {
    console.error("Fetch request canceled : ", err);
  }
};
getMovies(popularMoviesUrl(pageNumber));

//genres-names-api-function
const genresNamesUrl = `${baseUrl}genre/movie/list${apiKey}`;
const getGenresNames = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showGenresNames(data.genres);
  } catch (err) {
    console.error("Fetch request canceled : ", err);
  }
};
getGenresNames(genresNamesUrl);
