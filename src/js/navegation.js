window.addEventListener('loaded', ()=>{ navegator() }, false);
window.addEventListener('hashchange', navegator, false);


function HomePage(){
  randomMovie()
  MovieCard(`${API}trending/movie/day`, topMovies);
  MovieCard(`${API}trending/tv/day`, topOnTv);
  treadings.classList.add('show');
  searchContainer.classList.add('show')
  detailsContainer.classList.remove('show')
  searchResult.classList.remove('show')
  treadingTV.classList.add('show');
  iconBack.classList.remove('show')
  timerageMovie.classList.add('show')
  detailTitle.classList.remove('show')
}
function search(){
  treadings.classList.remove('show');
  searchContainer.classList.add('show')
  searchResult.classList.add('show') 
  iconBack.classList.add('show')
  Buscar();
}
function DetailsControl() {
  detailsContainer.classList.add('show')
    searchContainer.classList.remove('show')
    treadings.classList.add('show')
    iconBack.classList.add('show')
    treadingTV.classList.remove('show');
    timerageMovie.classList.remove('show')
    detailTitle.classList.add('show')

    let hashInfo=location.hash.split('=')
    let hashArray = hashInfo[1].split('-')
    let title = hashArray[2].replace(/[\%20]/gm,' ')
    console.log(hashArray);
    console.log(hashArray[1],hashArray[0],title);
    // Details(hashArray[1],hashArray[0],title);
}
function  navegator(){
  window.scrollTo(0, 0);
  if (location.hash.startsWith('#detail=')) {
    DetailsControl()    
  } else if(location.hash.startsWith('#search=')){
    search();
  }else{
    location.hash = '#home'
    HomePage();
  }
}

home.addEventListener('click', ()=>{
  // location.hash = '#home'
  navegator();
})

searchButton.addEventListener('click', async ()=>{
  location.hash = `#search=${inputSearch.value}`
  navegator();
  
});

inputSearch.addEventListener('keydown', async (event)=>{
  if (event.key == 'Enter') {
    location.hash = `#search=${inputSearch.value}`
    navegator();
  }
})
iconBack.addEventListener('click',   () =>{
  history.back()
})

HomePage()
