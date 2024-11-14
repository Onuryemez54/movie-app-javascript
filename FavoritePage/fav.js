const IMG_PATH = (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`;
const getClassByRate = (vote) =>
  vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";

const favMovies = document.getElementById("favoriteMovies");
const favHeadingTitle = document.getElementById("favHeading");

const favorites = JSON.parse(localStorage.getItem("favs")) || [];

function displayFavoriteMovies() {
  favMovies.innerHTML = "";

  favorites.map((movie) => {
    const { favTitle, favPoster, favBackDrop, favVoteAverage, favId } = movie;

    const favDiv = document.createElement("div");
    favDiv.classList.add("fav-div");

    const movieDiv = document.createElement("a");
    movieDiv.classList.add("movie", "fav-movie");
    movieDiv.href = `../DetailPage/movieDetail.html?movieId=${favId}`;

    const movieImg = document.createElement("img");
    movieImg.src = IMG_PATH(favPoster || favBackDrop);
    movieImg.alt = favTitle;

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");

    const movietitle = document.createElement("h3");
    movietitle.textContent = favTitle;

    const movieVote = document.createElement("span");
    movieVote.classList.add("vote-span", getClassByRate(favVoteAverage));
    movieVote.textContent = favVoteAverage.toFixed(1);

    movieInfo.appendChild(movietitle);
    movieInfo.appendChild(movieVote);

    movieDiv.appendChild(movieImg);
    movieDiv.appendChild(movieInfo);

    favDiv.appendChild(movieDiv);

    const removeButton = document.createElement("i");
    removeButton.classList.add("fa-solid", "fa-trash-can", "remove-icon");
    favDiv.appendChild(removeButton);

    favMovies.appendChild(favDiv);

    removeButton.addEventListener("click", () =>
      deleteTheMovieFromFavorites(favTitle)
    );
  });

  //uptading text of favHeadingTitle
  if (favorites.length === 0) {
    favHeadingTitle.textContent =
      "You haven't added any movies to your favorites list yet.";
    favHeadingTitle.style.color = "#fb0612";
  }
}

function deleteTheMovieFromFavorites(title) {
  favorites.map((fav, index) => {
    if (fav.favTitle === title) {
      favorites.splice(index, 1);
      displayFavoriteMovies();
    }
  });
  localStorage.setItem("favs", JSON.stringify(favorites));
}

document.addEventListener("DOMContentLoaded", displayFavoriteMovies);
