const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");

//movie-detail-api
const detailUrl = `${baseUrl}movie/${movieId}${apiKey}`;

if (movieId) {
  const getMovieDetail = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP Error! Status: ${res.status}`);
      }
      const result = await res.json();
      showMovieDetail(result);
    } catch (error) {
      console.error(error);
    }
  };
  getMovieDetail(detailUrl);
}

//movie-video-api
const movieVideoUrl = `${baseUrl}movie/${movieId}/videos${apiKey}`;

if (movieId) {
  async function getMovieVideo(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP Error! Status: ${res.status}`);
      }
      const result = await res.json();
      showMovieVideos(result.results);
    } catch (error) {
      console.error("not find video", error);
    }
  }
  getMovieVideo(movieVideoUrl);
}

//movie-credits-api
const IMG_PATH = (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`;

const movieCreditsUrl = `${baseUrl}movie/${movieId}/credits${apiKey}`;

if (movieId) {
  async function getMovieCredits(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP Error! Status: ${res.status}`);
      }
      const result = await res.json();
      showMovieCredits(result);
    } catch (error) {
      console.error("not find video", error);
    }
  }
  getMovieCredits(movieCreditsUrl);
}
