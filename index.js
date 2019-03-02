searchBar = document.querySelector('.search_Bar');
submitButton = document.querySelector('.submit_Button');
searchResults = document.querySelector('.search-results');

btnPrev = document.querySelector('#btn-prev');
btnNext = document.querySelector('#btn-next');
paginationCss = document.querySelector('.pagination-css'); 
page = document.querySelector('#page');

const apiKey = '3f2b4d11eb5ac29ac5a7f77d75117192';

const state = {};
let query = '';
let results = {};

// classes
class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const res = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`, {
            method: 'GET'
        })
        .then(response => { return response.json()})
        .catch(error => console.log(error))

        await res.then(data => {
            this.results = data.results;
            return this.results;
        })
    }
}

submitButton.addEventListener('click', async () => {
    // console.log(searchBar.value);
    query = searchBar.value;

    state.search = new Search(query);
    await state.search.getResults();

    if (state.search.results.length !== 0) {
        renderPage(1);
    } else {
        alert('NO RESULT!');
    };
    
});

searchBar.addEventListener('keydown', async event => {
    console.log('hi');

    if (event.keyCode === 13) {
        query = searchBar.value;

        state.search = new Search(query);
        await state.search.getResults();
    
        if (state.search.results.length !== 0) {
            renderPage(1);
        } else {
            alert('NO RESULT!');
        };
    }

})



// TEST ///////////////
// window.onload = async () => {
//     query = 'iron man';

//     state.search = new Search(query);
//     await state.search.getResults();

//     if (state.search.results.length !== 0) {
//         renderPage(1);
//     } else {
//         alert('NO RESULT!');
//     };
// };


// Pagination
let currentPage = 1;
const end = 0;
const resultsPerPage = 6;

paginationCss.style.visibility = 'hidden';

btnPrev.addEventListener('click', () => {

    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }

});

btnNext.addEventListener('click', () => {
    console.log('hi')
    if (currentPage < numPages()) {
        currentPage++;
        renderPage(currentPage);
    }

});

function renderPage(currentPage) {
 

    // Validate page
    if (currentPage < 1) currentPag = 1;
    if (currentPage > numPages()) currentPage = numPages();

    searchResults.innerHTML = '';

    const allResults = state.search.results;

    for (var i = (currentPage -1) * resultsPerPage ; i < currentPage * resultsPerPage && i < allResults.length; i++) {
        
        // Add word limit on movie description
        const newOverview = state.search.results[i].overview.split(' ').slice(0, 20).join(' ');;

        const markup = `
        <div class="movie-box col-lg-6 col-xl-4">
            <div class="movie-poster">
                <img class="poster" src="http://image.tmdb.org/t/p/w500/${state.search.results[i].poster_path}">
            </div>
            <div class="movie-body">
            <div class="movie-title">${state.search.results[i].title}</div>
            <div class="movie-overview">${newOverview} ...</div>
            <div class="movie-vote-average">Vote Average: ${state.search.results[i].vote_average}</div>
            <div class="movie-vote-count">Vote Count: ${state.search.results[i].vote_count}</div>
            <div class="review"><a href="#">Check Out Hieu's Review</a></div>
            </div>
        </div>
        `;
        searchResults.insertAdjacentHTML('beforeend', markup);
    }

    // show current page / total page
    page.style.visibility = 'visible';
    page.innerHTML = 'Page:' + currentPage + '/' + numPages();
    

    btnPrev.style.visibility = currentPage == 1 ? 'hidden' : 'visible';
	btnNext.style.visibility = currentPage == numPages() ? 'hidden' : 'visible';

};

function numPages() {

    return Math.ceil(state.search.results.length / resultsPerPage);

};












// https://api.themoviedb.org/3/movie/76341?api_key=3f2b4d11eb5ac29ac5a7f77d75117192


// window.onload = () => {
//     query = 'iron man';

//     const res = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`, {
//         method: 'GET'
//     })
//     .then(response => { return response.json()})
//     .catch(error => console.log(error))

//     res.then(data => {
//         console.log(data);

//         data.results.forEach(movie => {
//             // push movie data to state 
//             state.push(movie);
//         })
        
//     })
// };

//  API KEY: '3f2b4d11eb5ac29ac5a7f77d75117192';

            // const overview = movie.overview

            // // Add word limit on movie description
            // let newOverview = overview.split(' ').slice(0, 25).join(' ');

            // const markup = `
            // <div class="movie-box col-lg-6 col-xl-4">
            //     <div class="movie-poster">
            //         <img class="poster" src="http://image.tmdb.org/t/p/w500/${movie.poster_path}">
            //     </div>
            //     <div class="movie-body">
            //     <div class="movie-title">${movie.title}</div>
            //     <div class="movie-overview">${newOverview}</div>
            //     <div class="movie-vote-average">Vote Average: ${movie.vote_average}</div>
            //     <div class="movie-vote-count">Vote Count: ${movie.vote_count}</div>
            //     <div class="review"><a href="#">Check Out Hieu's Review</a></div>
            //     </div>
            // </div>
            // `;

            // searchResults.insertAdjacentHTML('beforeend', markup);
