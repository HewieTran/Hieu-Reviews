const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Hieu-Reviews',{ useNewUrlParser: true });


const reviewSchema = new mongoose.Schema({
    title: String,
    overview: String,
    voteAverage: Number,
    voteCount: Number,
    id: Number,
    poster: String,
    hieusReview: String
});

const reviews = mongoose.model('review', reviewSchema);

// CREATE A MOVIE AND STORE IN MONGODB
// reviews.create(
//     {
//         title: 'Iron Man',
//         overview: "Seasoned musician Jackson Maine discovers — and falls in love with — struggling artist Ally. She has just about given up on her dream to make it big as a singer — until Jack coaxes her into the spotlight. But even as Ally's career takes off, the personal side of their relationship is breaking down, as Jack fights an ongoing battle with his own internal demons.",
//         voteAverage: 7.5,
//         voteCount: 4316,
//         id: 332562,
//         hieusReview: 'The first 30 minutes of this movie (when lady Gaga performed shallow for the first time) was perfect yo, 10/10. The rest of the movie after that felt off, the pacing was definitely the problem. It\'s like drinking a cold one on a hot day in the back seat, and then the car start hitting bumps on the road for the rest of the ride.'
//     },
//     (err, review) => {
//         if(err) {
//             console.log(err)
//         } else {
//             console.log(review);
//         }
//     }
// );

// reviews.deleteOne({title: 'Iron Man'}, err => {
//     if (err) return handleError(err);
//   });


var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// HOMEPAGE - LANDING PAGE
app.get('/', (req, res) => {
    res.render('home')
});

// REVIEWS PAGE
app.get('/reviews', (req, res) => {
    res.render('reviews')
    // reviews.find({}, (err, allReviews) => {
    //     if(err) {
    //         console.log(err)
    //     } else {
    //         res.render('showMovie', {reviews: allReviews})
    //         // console.log(allReviews);
    //     }
    // })
});

// CONTACT ME
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/reviews/:id', (req, res) => {
    
    res.render('show');
});



// ///////////////////////////////////////////

// const data = [
//     {title: 'movie1', overview: 'ipsum lorem'},
//     {title: 'movie2', overview: 'ipsum lorem'},
// ];
    


// // TEST
// app.get('/test', (req, res) => {
//     res.render('showMovie', {testData: data})
// });

app.listen(port, () => {
    console.log('Hieu-Reviews is running!')
});
