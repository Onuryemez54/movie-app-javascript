const apiKey = "?api_key=e11ee625596a8cd6e3a752bbc3522281";
const baseUrl = "https://api.themoviedb.org/3/";

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
