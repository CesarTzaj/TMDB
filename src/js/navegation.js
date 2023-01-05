window.addEventListener(
  "loaded",
    navegator,
  false
);
window.addEventListener("hashchange", navegator, false);

async function HomePage() {
  location.hash = "#home";
  tredings.classList.add("show");
  searchContainer.classList.add("show");
  detailsContainer.classList.remove("show");
  searchResult.classList.remove("show");
  tredingTV.classList.add("show");
  timerageMovie.classList.add("show");
  detailTitle.classList.remove("show");
  await randomMovie();
  await MovieCard(`trending/movie/day`, topMovies);
  await MovieCard(`trending/tv/day`, topOnTv);
}
function search() {
  window.scrollTo(0, 0);
  tredings.classList.remove("show");
  searchContainer.classList.add("show");
  searchResult.classList.add("show");
  Buscar();
}
function DetailsControl() {
  detailsContainer.classList.add("show");
  searchContainer.classList.remove("show");
  tredings.classList.add("show");
  tredingTV.classList.remove("show");
  timerageMovie.classList.remove("show");
  detailTitle.classList.add("show");

  let hashInfo = location.hash.split("=");
  let hashArray = hashInfo[1].split("-");
  let title = hashArray[2].replace(/[\%20]/gm, " ");
  console.log(hashArray);
  console.log(hashArray[1], hashArray[0], title);
  // asd(hashArray[1],hashArray[0],title);
}
async function navegator() {
  document.documentElement.scrollTop=0;
  console.log(document.documentElement.scrollTop + ' sroll ');
  if (location.hash.startsWith("#detail=")) {
    DetailsControl();
  } else if (location.hash.startsWith("#search=")) {
     search();
  } else {
    HomePage();
  }
}
btnMovieDay.addEventListener("click", async () => {
  const currentCategorynActive = document.querySelector(
    ".tredingOption .active"
  );
  currentCategorynActive.classList.remove("active");
  btnMovieDay.classList.add("active");
  await MovieCard(`trending/movie/day`, topMovies);
});

btnMovieWeek.addEventListener("click", async () => {
  const currentCategorynActive = document.querySelector(
    ".tredingOption .active"
  );
  console.log(currentCategorynActive);
  currentCategorynActive.classList.remove("active");
  btnMovieWeek.classList.add("active");
  await MovieCard(`trending/movie/week`, topMovies);
});

btnDayTV.addEventListener("click", async () => {
  const currentTimerage = document.querySelector(".timeragetv .active");
  currentTimerage.classList.remove("active");
  btnDayTV.classList.add("active");
  await MovieCard(`trending/tv/day`, topOnTv);
});

btnWeekTv.addEventListener("click", async () => {
  const currentTimerage = document.querySelector(".timeragetv .active");
  currentTimerage.classList.remove("active");
  btnWeekTv.classList.add("active");
  await MovieCard(`trending/tv/week`, topOnTv);
});

home.addEventListener("click", () => {

  navegator();
});

searchButton.addEventListener("click", async () => {
  if (inputSearch.value!=='') {
    location.hash = `#search=${inputSearch.value}`;
    navegator();
  }
  // inputSearch.value = "";
});

inputSearch.addEventListener("keydown",  (event) => {
  console.log(event, " keydown");
  if (event.key == "Enter") {
    if (inputSearch.value!=='') {
      location.hash = `#search=${inputSearch.value}`;
      navegator();
      
    }
  }
});


HomePage();
observers.observe(topMovies)