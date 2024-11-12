const form = document.getElementById("form");
const searchText = document.getElementById("search");
const main = document.getElementById("main");
const headerSlice = document.getElementById("slice-container");

function showMovies(movies) {
  // console.log(movies);
  main.innerHTML = "";

  //slice-section

  const filteredMovies = movies.filter((movie) => movie.vote_average >= 7.5);
  // console.log(filteredMovies);

  filteredMovies.map((movie) => {
    const { title, backdrop_path, id, poster_path } = movie;

    const sliceDiv = document.createElement("div");
    sliceDiv.classList.add("slice-div");

    const imgTitle = document.createElement("h2");
    imgTitle.classList.add("img-title");
    imgTitle.innerText = title;

    const imgBtn = document.createElement("a");
    imgBtn.classList.add("img-btn");
    imgBtn.innerText = "Show Overview";
    imgBtn.href = `../DetailPage/movieDetail.html?movieId=${id}`;

    const headerImg = document.createElement("img");
    headerImg.classList.add("slice-img");
    headerImg.src = originalImage(backdrop_path || poster_path);
    headerImg.alt = title;

    sliceDiv.appendChild(headerImg);
    sliceDiv.appendChild(imgTitle);
    sliceDiv.appendChild(imgBtn);

    headerSlice.appendChild(sliceDiv);
  });

  //slice-timer
  const images = document.querySelectorAll(".slice-div");
  // console.log(images);

  let index = 0;
  let timer = setInterval(changeSliceImage, 10000);

  function changeSliceImage() {
    clearInterval(timer);

    index = (index + 1) % images.length;

    images.forEach((img) => img.classList.remove("active"));

    images[index].classList.add("active");
    timer = setInterval(changeSliceImage, 10000);
  }
  changeSliceImage();

  //main-videos-section

  movies.map((movie) => {
    const { title, poster_path, vote_average, overview, id, backdrop_path } =
      movie;

    const movieDiv = document.createElement("a");
    movieDiv.classList.add("movie");
    movieDiv.href = `../DetailPage/movieDetail.html?movieId=${id}`;

    const img = document.createElement("img");
    img.src = IMG_PATH(poster_path || backdrop_path);
    img.alt = title;

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    const voteSpan = document.createElement("span");
    voteSpan.classList.add("vote-span", getClassByRate(vote_average));
    voteSpan.textContent = vote_average.toFixed(1);

    movieInfo.appendChild(titleElement);
    movieInfo.appendChild(voteSpan);

    const overviewDiv = document.createElement("div");
    overviewDiv.classList.add("overview");

    const overviewTitle = document.createElement("h3");
    overviewTitle.textContent = "Overview";

    const overviewText = document.createTextNode(overview);

    overviewDiv.appendChild(overviewTitle);
    overviewDiv.appendChild(overviewText);

    movieDiv.appendChild(img);
    movieDiv.appendChild(movieInfo);
    movieDiv.appendChild(overviewDiv);

    main.appendChild(movieDiv);
  });
}
//for vote class-function
function getClassByRate(vote) {
  return vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";
}

//Search -- section

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = searchText.value;

  if (searchValue && searchValue !== "") {
    getMovies(searchMoviesUrl(searchValue));
  } else {
    window.location.reload();
  }

  searchText.value = "";
});

//button section

const nextButton = document.getElementById("next");

nextButton.addEventListener("click", increasePageNumber);

function increasePageNumber() {
  if (pageNumber <= 20) {
    pageNumber++;
    getMovies(popularMoviesUrl(pageNumber));
  }
}

const previousButton = document.getElementById("back");

previousButton.addEventListener("click", decreasePageNumber);

function decreasePageNumber() {
  if (pageNumber >= 2) {
    pageNumber--;
    getMovies(popularMoviesUrl(pageNumber));
  }
}
