const API = "https://api.themoviedb.org/3/";
const key = "api_key=bca89f39840c72f56b62b4a0dda09fde";

const home = document.querySelector('#homePage')
const main = document.querySelector('main')
const detailsContainer = document.querySelector('.details')
const searchContainer = document.querySelector('.searchContainer')
const treadings = document.querySelector('.treadings')
const searchResult = document.querySelector('.searchResult');
const iconBack = document.querySelector('.fa-solid') 
// search

const inputSearch = document.querySelector('.inputSearch');
const searchButton = document.querySelector('.searchButton');
// const results = document.querySelector('.results')
const errorSpan = document.querySelector('#erorr');
const topMovies = document.querySelector('#movies');
const topOnTv = document.querySelector('#onTv');

const btnMovieDay = document.querySelector('#movieday');
const btnMovieWeek = document.querySelector('#movieweek')
const btnDayTV = document.querySelector('#tvday');
const btnWeekTv = document.querySelector('#tvweek');
const backgoundImgage = document.querySelector('.backgoundImage');
const circle = document.querySelector('.outer circle')
const treadingOption = document.querySelector('.treadingOption')
const treadingTV = document.querySelector('#treadingTV')