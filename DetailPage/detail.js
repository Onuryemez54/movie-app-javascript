const detailContainer = document.getElementById("detail-container");
const detailDiv = document.getElementById("detail-div");
const infoContainer = document.getElementById("info-container");

// movie-detail-section

function showMovieDetail(movie) {
  const {
    backdrop_path,
    genres,
    title,
    overview,
    release_date,
    vote_average,
    poster_path,
    id,
  } = movie;

  const headerImg = document.createElement("div");
  headerImg.setAttribute(
    "style",
    `background-image: url(https://image.tmdb.org/t/p/original/${
      backdrop_path || poster_path
    })`
  );
  headerImg.classList.add("header-img");

  const detailImg = document.createElement("img");
  detailImg.src = `https://image.tmdb.org/t/p/original/${
    movie.belongs_to_collection?.backdrop_path || poster_path
  }`;
  detailImg.alt = title;
  detailImg.classList.add("detail-img");

  const vote = document.createElement("span");
  vote.classList.add("detail-vote");
  vote.textContent = vote_average.toFixed(1);

  const detailTitle = document.createElement("h2");
  detailTitle.textContent = title;

  const detailOverview = document.createElement("p");
  detailOverview.classList.add("detail-overview");
  detailOverview.textContent = overview;

  const releaseDate = document.createElement("span");
  releaseDate.classList.add("release-date");
  releaseDate.textContent = `Release Date : ${release_date}`;

  const genresNames = genres.map((genre) => genre.name);
  const genresEl = document.createElement("div");
  genresEl.classList.add("genres-div");
  genresEl.textContent = "Genres :";

  genresNames.map((name, index) => {
    const genre = document.createElement("p");
    genre.textContent = index < genres.length - 1 ? name + " - " : name;
    genre.classList.add("genre-name");
    genresEl.appendChild(genre);
  });

  infoContainer.appendChild(vote);
  infoContainer.appendChild(detailTitle);
  infoContainer.appendChild(detailOverview);
  infoContainer.appendChild(releaseDate);
  infoContainer.appendChild(genresEl);

  detailDiv.appendChild(headerImg);
  detailDiv.appendChild(detailImg);
  detailDiv.appendChild(infoContainer);

  //favorite-section
  const favIcon = document.createElement("i");
  favIcon.classList.add("fa-solid", "fa-heart", "fav-icon");
  infoContainer.insertBefore(favIcon, detailTitle);

  favIcon.addEventListener("click", () => {
    favIcon.classList.toggle("selected");

    if (favIcon.classList.contains("selected")) {
      const favMovie = {
        favTitle: title,
        favPoster: poster_path,
        favBackDrop: backdrop_path,
        favVoteAverage: vote_average,
        favId: id,
      };

      let favorites = JSON.parse(localStorage.getItem("favs")) || [];
      favorites = [...favorites, favMovie];
      localStorage.setItem("favs", JSON.stringify(favorites));
    } else {
      let favorites = JSON.parse(localStorage.getItem("favs")) || [];
      favorites = favorites.filter((favItem) => favItem.favTitle !== title);
      localStorage.setItem("favs", JSON.stringify(favorites));
    }
  });

  //Integrating favIcon color into every detail page
  const favorites = JSON.parse(localStorage.getItem("favs")) || [];
  const isFavorited = favorites.some((movie) => movie.favTitle === title);

  if (isFavorited) {
    favIcon.classList.add("selected");
  }

  //back-button-section
  const backButton = document.createElement("i");
  backButton.classList.add("back-btn", "fa-solid", "fa-left-long");
  infoContainer.insertBefore(backButton, detailTitle);
  backButton.addEventListener("click", () => {
    window.history.back();
  });
}

//credits--section

function showMovieCredits(credits) {
  const { cast, crew } = credits;
  const sliceCast = cast.slice(0, 6);

  const creditsContainer = document.createElement("div");
  creditsContainer.classList.add("credits-container");

  const castContainer = document.createElement("div");
  castContainer.classList.add("cast-container");

  const crewContainer = document.createElement("p");
  crewContainer.classList.add("crew-container");
  crewContainer.textContent = "Director : ";

  //crew-section
  const filteredCrew = crew
    .filter(
      (crew) =>
        crew.known_for_department === "Directing" ||
        crew.known_for_department === "Writing"
    )
    .slice(0, 3)
    .map((crew) => crew.name);

  const addingUniqeNameToCrew = filteredCrew.reduce((acc, value) => {
    if (!acc.includes(value)) {
      acc.push(value);
    }
    return acc;
  }, []);

  addingUniqeNameToCrew.map((crew, index) => {
    const directorName = document.createElement("span");
    directorName.classList.add("directing");
    directorName.textContent =
      addingUniqeNameToCrew.length > 1 &&
      index !== addingUniqeNameToCrew.length - 1
        ? crew + " , "
        : crew;
    crewContainer.appendChild(directorName);
  });

  creditsContainer.appendChild(crewContainer);

  //cast-section
  const filteredCast = sliceCast.map((cast) => ({
    ActingName: cast.name,
    CharacterName: cast.character,
    Profile: cast.profile_path,
  }));
  filteredCast.map((cast) => {
    const { ActingName, CharacterName, Profile } = cast;

    const castDiv = document.createElement("div");
    castDiv.classList.add("cast-div");

    const acting = document.createElement("p");
    acting.classList.add("acting");
    acting.textContent = ActingName;

    const character = document.createElement("span");
    character.classList.add("character");
    character.textContent = `(${CharacterName})`;

    const actingImg = document.createElement("img");
    actingImg.classList.add("acting-img");
    actingImg.src = IMG_PATH(Profile);

    castDiv.appendChild(actingImg);
    castDiv.appendChild(acting);
    castDiv.appendChild(character);
    castContainer.appendChild(castDiv);
  });
  creditsContainer.appendChild(castContainer);
  infoContainer.appendChild(creditsContainer);
}

//video--section

function showMovieVideos(results) {
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container");

  const filteredVideos = results
    .filter((res) => res.type === "Trailer" || res.type === "Teaser")
    .map((res) => ({
      name: res.name,
      key: res.key,
      id: res.id,
    }))
    .slice(0, 2);

  filteredVideos.map((video) => {
    const videoUrl = `https://www.youtube.com/embed/${video.key}/${video.id}`;
    const iframe = document.createElement("iframe");
    iframe.src = videoUrl;
    iframe.allow =
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.classList.add("video");

    const title = document.createElement("h3");
    title.classList.add("video-title");
    title.textContent = video.name;

    const videoDiv = document.createElement("div");
    videoDiv.classList.add("video-div");

    videoDiv.appendChild(title);
    videoDiv.appendChild(iframe);
    videoContainer.appendChild(videoDiv);
  });
  detailDiv.appendChild(videoContainer);
}
