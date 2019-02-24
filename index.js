searchBar = document.querySelector('.search_Bar');
submitButton = document.querySelector('.submit_Button');

const apiKey = '3f2b4d11eb5ac29ac5a7f77d75117192';
let query = '';

// submitButton.addEventListener('click', () => {
//     // console.log(searchBar.value);

//     query = searchBar.value;

//     const res = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`, {
//         method: 'GET'
//     })
//     .then(response => { return response.json()})
//     .catch(error => console.log(error))

//     res.then( data => {
//         console.log(data);
//     })
    
// });


// TEST ///////////////
// window.onload = () => {
//     query = 'iron man';

//     const res = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`, {
//         method: 'GET'
//     })
//     .then(response => { return response.json()})
//     .catch(error => console.log(error))

//     res.then( data => {
//         console.log(data);

//         data.results.forEach(movie => {
//             const markup = `
//             <div class="card" style="width: 18rem;">
//                 <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="...">
//                 <div class="card-body">
//                 <h5 class="card-title">Card title</h5>
//                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                 </div>
//                 <ul class="list-group list-group-flush">
//                 <li class="list-group-item">Cras justo odio</li>
//                 <li class="list-group-item">Dapibus ac facilisis in</li>
//                 <li class="list-group-item">Vestibulum at eros</li>
//                 </ul>
//                 <div class="card-body">
//                 <a href="#" class="card-link">Card link</a>
//                 <a href="#" class="card-link">Another link</a>
//                 </div>
//             </div>
//             `
//         })
//     })


// };










// https://api.themoviedb.org/3/movie/76341?api_key=3f2b4d11eb5ac29ac5a7f77d75117192

//  API KEY: '3f2b4d11eb5ac29ac5a7f77d75117192';