async function fetchData(url, query = '') {
  try {
    let response = await fetch(`${url}?${key}&${query}`);
    if (response.status === 200) {
      const data = await response.json()
      // console.log(data);
      return data
    } else {
      errorSpan.append(`${url}, ${response.status}`)
      console.log(response);
    }
  } catch (error) {
    console.log(error);
    errorSpan.append(error)
  }

}
function skeletonImg(wrapper) {
  for (let index = 0; index < 5; index++) {
    let container = document.createElement('div');
    let imgCard = document.createElement('div')
    let title = document.createElement('div')
    let paragraph = document.createElement('div')
    let paragraph2 = document.createElement('div')
    let date = document.createElement('div')
  
    container.classList.add('me-2', 'mt-3');
    imgCard.classList.add('skeletonimg');
    paragraph.classList.add('skeletonTxt')
    paragraph2.classList.add('skeletonTxt')
    date.classList.add('skeletonDate');
    title.append(paragraph, paragraph2);
    container.append(imgCard, title, date)
  wrapper.append(container)
  }
}
function SkeletonDetail(wrapper) {
  wrapper.innerHTML = '';
  const skeletonimg = document.createElement('div');
  const container = document.createElement('div');
  const skeletonTitle = document.createElement('div');
  const skeletonDate = document.createElement('div');
  const overview = document.createElement('div');
  const skeletonTxt1 = document.createElement('div');
  const skeletonTxt2 = document.createElement('p');
  const skeletonTxt3 = document.createElement('article')
  const skeletonTxt4 = document.createElement('article');
  container.classList.add('detailsContainer')
  skeletonimg.classList.add('skeletonimgDtl');
  skeletonTitle.classList.add('skeletonTitle');
  skeletonDate.classList.add('skeletonDate');
  overview.classList.add('skeletonDate');
  skeletonTxt1.classList.add('skeletonTxt');
  skeletonTxt2.classList.add('skeletonTxt');
  skeletonTxt3.classList.add('skeletonTxt');
  skeletonTxt4.classList.add('skeletonTxt');
  container.append(skeletonTitle, skeletonDate, overview, skeletonTxt1, skeletonTxt2, skeletonTxt3, skeletonTxt4)
  console.log(container);
  wrapper.append(skeletonimg, container)
  console.log(wrapper);
}
function SkeletonSearch(wrapper) {
  wrapper.innerHtml=''
for (let index = 0; index < 6; index++) {
  const container = document.createElement('div');
  const skeletonimg = document.createElement('div');
  const detailsContainer = document.createElement('div');
  const skeletonTitle = document.createElement('article');
  const skeletonTxt1 = document.createElement('p');
  const skeletonTxt2 = document.createElement('p');
  const skeletonTxt3 = document.createElement('p');
  const skeletonTxt4 = document.createElement('p');
  container.classList.add('col-10', 'mt-5', 'searchResults', 'align-self-center');
  skeletonimg.classList.add('skeletonimg');
  detailsContainer.classList.add('detailsContainer', 'mt-4');
  skeletonTitle.classList.add('skeletonTitle','mb-4');
  skeletonTxt1.classList.add('skeletonTxt');
  skeletonTxt2.classList.add('skeletonTxt');
  skeletonTxt3.classList.add('skeletonTxt');
  skeletonTxt4.classList.add('skeletonTxt');
  detailsContainer.append(skeletonTitle, skeletonTxt1, skeletonTxt2, skeletonTxt3, skeletonTxt4);
  container.append(skeletonimg, detailsContainer)
  wrapper.append(container)
}
}
async function Details(type, id, movie = '') {
  SkeletonDetail(detailsContainer)
  location.hash = `#detail=${id}-${type}-${movie}`
  
  TreadingOption(`Related with ${movie}`, detailTitle)
  const response = await fetchData(`${API}${type}/${id}`);
  detailsContainer.innerHTML = '';
  const divBackground = document.createElement('div');
  const informationSection = document.createElement('section');
  const frontImage = document.createElement('img');
  const informationDiv = document.createElement('div');
  const title = document.createElement('h5');
  const genders = document.createElement('div');
  const overview = document.createElement('p');
  const details = document.createElement('article')
  const date = document.createElement('article');
  const dot = document.createElement('div');
  const unorderList = document.createElement('ul');
  const sectionScore = document.createElement('section')
  const userScore = document.createElement('span');
  const progresPorcentage = document.createElement('div');
  const outer = document.createElement('div');
  const inner = document.createElement('div');
  const number = document.createElement('div');
  const svg = document.createElement('svg');
  frontImage.classList.add('skeleton')
  genders.classList.add('genders');
  informationSection.classList.add('information')
  divBackground.classList.add('background', 'skeleton');
  //genders

  if (type === 'tv') {
    date.append(response.last_air_date ?? response.next_episode_to_air.air_date, "(US)");
  } else if (type === 'movie') {
    date.append(`${response.release_date}, (US)` ?? response.also_known_as);
  } else {
    date.append(response.also_known_as);
  }
  const porcentage = Number((response.vote_average * 10)).toFixed(2);
  if (type !== 'person') {

    await MovieCard(`${API}/${type}/${id}/similar`, topMovies)

    divBackground.style.setProperty('background-image', `url(https://image.tmdb.org/t/p/w500/${response.poster_path})`);
    svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="120px" height="120px">
                
    <circle cx="35" cy="35" r="30" stroke-linecap="round" style="stroke-dashoffset: ${185 - (porcentage * 1.85)}" />
   </svg>`;
    inner.classList.add('inner');
    outer.classList.add('outer');
    progresPorcentage.classList.add('progresPorcentage');
    number.classList.add('number');
    number.append(porcentage, "%");
    userScore.append('User Score');
    response.genres.forEach(gender => {
      const li = document.createElement('li');
      li.append(gender.name);
      unorderList.append(li)
    })
    genders.append(date, dot, unorderList);
  } else {
    divBackground.style.setProperty('background', 'gray');
    genders.append(date)
  }
  inner.append(number);
  outer.append(inner, svg)
  progresPorcentage.append(outer)
  sectionScore.append(progresPorcentage)
  sectionScore.append(userScore, progresPorcentage)
  title.append(response.name ?? response.original_title);
  overview.append('Overview');
  details.append(overview, response.overview ?? response.biography)
  informationDiv.append(title, genders, sectionScore, details);
  if (response.profile_path != null || response.poster_path != null) {
    frontImage.setAttribute('src', `https://image.tmdb.org/t/p/w200/${response.poster_path ?? response.profile_path}`)
  } else {
    frontImage.setAttribute('src', 'https://media.istockphoto.com/id/1403254053/es/vector/persona-o-personas-realistas-en-3d.jpg?s=612x612&w=0&k=20&c=HnMvQkY-BWPoZec9_GdHEIblKTE7ckLBvykuhf-OMZ0=')
  }

  informationSection.append(frontImage, informationDiv);
  detailsContainer.append(divBackground, informationSection);
}

function TreadingOption(title, wrapper) {
  wrapper.innerHTML = '';
  const article = document.createElement('article');
  article.append(title)
  wrapper.append(article);
}

async function MovieCard(url, wrapper,) {
  skeletonImg(wrapper)
  let type = url.split('/')[5];
  
  const response = await fetchData(url)
  wrapper.innerHTML = '';
  response.results.forEach(element => {
    let name;
    const card = document.createElement('div');
    const movideImg = document.createElement('img');
    const title = document.createElement('h5');
    const date = document.createElement('article')
    // classes
    card.classList.add('me-0','me-md-5', 'mt-3')
    movideImg.classList.add('portada','skeleton');
    movideImg.setAttribute('alt', `Portada  de ${element.title}`)
    movideImg.setAttribute('src', `https://image.tmdb.org/t/p/w200/${element.poster_path}`)
    title.classList.add('title')
   
    if (element.media_type == 'tv') {
      name = title.innerText = element.name
      date.innerText = new Date(element.first_air_date).toDateString()

    } else {
      name = element.title
      date.innerText = new Date(element.release_date).toDateString()
    }
    card.addEventListener('click', async () => {
      await Details(type, element.id, name)

    });
    title.append(name)
    card.append(movideImg, title, date);
    wrapper.append(card)
  });
  
}

function ramdonNumber(length) {
  return Math.floor(Math.random() * length)
}

async function randomMovie() {
  let response = await fetchData('https://api.themoviedb.org/3/trending/movie/week');
  let index = ramdonNumber(response.results.length);
  const url = response.results[index].poster_path;
  backgoundImgage.style.setProperty('background-image', `url(https://image.tmdb.org/t/p/w500/${url})`)
}
randomMovie()
async function Languages() {
  const response = await fetchData(`${API}configuration/languages`)
  console.log(response);
}

btnMovieDay.addEventListener('click', async () => {
  const currentCategorynActive = document.querySelector('.treadingOption .active')
  currentCategorynActive.classList.remove('active')
  btnMovieDay.classList.add('active')
  await MovieCard(`${API}trending/movie/day`, topMovies);

});

btnMovieWeek.addEventListener('click', async () => {
  const currentCategorynActive = document.querySelector('.treadingOption .active')
  console.log(currentCategorynActive);
  currentCategorynActive.classList.remove('active')
  btnMovieWeek.classList.add('active')
  await MovieCard(`${API}trending/movie/week`, topMovies);
})

btnDayTV.addEventListener('click', async () => {
  const currentTimerage = document.querySelector('.timeragetv .active')
  currentTimerage.classList.remove('active')
  btnDayTV.classList.add('active')
  await MovieCard(`${API}trending/tv/day`, topOnTv);
})

btnWeekTv.addEventListener('click', async () => {
  const currentTimerage = document.querySelector('.timeragetv .active')
  currentTimerage.classList.remove('active')
  btnWeekTv.classList.add('active')
  await MovieCard(`${API}trending/tv/week`, topOnTv);
})

async function Buscar() {
  if (inputSearch.value !== '') {
    SkeletonSearch(searchResult)
    
    const response = await fetchData('https://api.themoviedb.org/3/search/multi', `query=${inputSearch.value}`)
    searchResult.innerHTML = '';
    response.results.forEach(movie => {
      const content = document.createElement('div');
      const contentText = document.createElement('div');
      const imgCard = document.createElement('img');
      const title = document.createElement('h5');
      imgCard.classList.add('skeleton')
      const article = document.createElement('article');
      imgCard.setAttribute('alt', `Portada de  ${movie.title}`)
      content.classList.add('col-10', 'mt-5', 'searchResults', 'align-self-center')
      title.classList.add('fw-bold', 'fs-1')
      let name;

      // console.log(movie.poster_path);
      if (movie.media_type == 'movie') {
        name = movie.title
        article.innerText = movie.overview
        imgCard.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      } else if (movie.media_type == 'tv') {
        name = movie.original_name
        article.append(movie.overview)
        imgCard.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      } else {
        name = movie.name
        article.innerText = `${movie.media_type} ${movie.known_for_department}. `
        if (movie.profile_path != null) {
          imgCard.src = `https://image.tmdb.org/t/p/w200${movie.profile_path}`
        } else {
          imgCard.src = 'https://media.istockphoto.com/id/1403254053/es/vector/persona-o-personas-realistas-en-3d.jpg?s=612x612&w=0&k=20&c=HnMvQkY-BWPoZec9_GdHEIblKTE7ckLBvykuhf-OMZ0='
        }
      }
      content.addEventListener('click', async () => {
        await Details(movie.media_type, movie.id,)
      });
      title.append(name);
      contentText.append(title, article);
      content.append(imgCard, contentText);
      searchResult.append(content);
    })

  } else {
    errorSpan.innerHTML = `<div class="alert alert-primary" role="alert">
    A simple primary alert—check it out!
  </div>`
  }

}




