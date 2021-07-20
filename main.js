let searchIcon = document.querySelector('.search-icon');
let close = document.querySelector('.close');
let sideBar = document.querySelector('.sideBar');
let nextArrow = document.querySelector('.next-arrow');
let backArrow = document.querySelector('.back-arrow');
const featuredWrapper = document.querySelector('.featured-list');
let content = document.querySelector('.content');
const searchForm = document.getElementById('search-form');
const searchBar = document.getElementById('searchBar');
const mainContainer = document.querySelector('.main-container');
const ham = document.querySelector('.ham');
const links = document.querySelector('.links');


                                    //HAMBURGER//
                                    //HAMBURGER//
                                    //HAMBURGER//
ham.addEventListener('click', ()=>{
    links.classList.toggle('close');
    ham.classList.toggle('red');
})


                                    //ARROW//
                                    //ARROW//
                                    //ARROW//
let counter = 0;
console.log(featuredWrapper.computedStyleMap().get("transform")[0].x.value);

nextArrow.addEventListener('click', ()=>{
    const itemNumber = featuredWrapper.querySelectorAll("img").length;
    counter++;
    if (itemNumber - (4 + counter) >= 0) {
        featuredWrapper.style.transform = `translate(${
            featuredWrapper.computedStyleMap().get("transform")[0].x.value - 315}px)`;
    } else{
        featuredWrapper.style.transform = "translateX(0)";
        counter = 0;
    }
})

backArrow.addEventListener('click', ()=>{
    featuredWrapper.style.transform = "translateX(0)";
})

searchIcon.addEventListener('click', ()=>{
    mainContainer.classList.toggle('open');
})



                                    //API WORK//
                                    //API WORK//
                                    //API WORK//
const API_KEY = "api_key=beb574575a69309e58b77e80a1950bda";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&"+API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500"; 
const searchURL = BASE_URL + '/search/movie?' + API_KEY;




getMovies(API_URL);

function getMovies(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showMovies(data.results);
        console.log(data.results)
    })
}

function showMovies(data){
    featuredWrapper.innerHTML = '';
    console.log('hurray');

    data.forEach(movie => {
        console.log('okay');
        
        const {title, poster_path, overview, backdrop_path} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = ` 
                        <div class="featured-container">
                        
                        <img src="${IMG_URL+poster_path}" alt="${backdrop_path}"  class="featured-image">

                        <div class="featured-description">
                            <h1 class="feature-title">${title}</h1>
                            <p class="featured-text">${overview}</p>
                        </div>

                        </div>
        `
        featuredWrapper.appendChild(movieEl);
    })
}

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchTerm = searchBar.value;

        if (searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
        }else{
            getMovies(API_URL);
        }
    searchBar.value = '';
    return
})


