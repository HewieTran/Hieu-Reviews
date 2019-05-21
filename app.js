const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ejsLint = require('ejs-lint');

// mongoose.connect('mongodb://localhost/hieu-reviews', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://tranhieu07:Lyco2015!@hieu-reviews-atlas-cluster-d1jyv.mongodb.net/hieu-reviews?retryWrites=true', { useNewUrlParser: true }).then(() => {
    console.log('Connected to Database');
}).catch((err) => {
    console.log('Not Connected to Database ERROR!', err);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const reviewSchema = new mongoose.Schema({
    title: String,
    poster: String,
    posterFull: String,
    releaseDate: String,
    directedBy: String,
    cinematographyBy: String,
    budget: String,
    boxOffice: String,
    reviewContent: String
});

const reviews = mongoose.model('review', reviewSchema);

var port = process.env.PORT || 3000;


// HOME.EJS
app.get('/', (req, res) => {
    reviews.find().sort( [['_id', -1]] ).limit(4).exec((err, allReviews) => {
        res.render('home', {
            reviews: allReviews
        })
    });
});


// REVIEWS.EJS
app.get('/reviews/:currentPage', (req, res, next) => {
    let currentPage = req.params.currentPage || 1;
    let resPerPage = 6;


    reviews.find().sort( [['_id', -1]] ).skip((resPerPage * currentPage) - resPerPage).limit(resPerPage).exec((err, allReviews) => {
        reviews.countDocuments().exec((err, count) => {
            if (err) { return next(err) }

            res.render('reviews', {
                reviews: allReviews,
                currentPage: currentPage,
                totalPages: Math.ceil(count / resPerPage)
            })
        })
    })
});

let content = '';

// POST ROUTE
app.post('/reviews', (req, res) => {
    // get data from form and add to reviews collection
    const title = req.body.title;
    const poster = req.body.poster;
    const posterFull = req.body.posterFull;
    const releaseDate = req.body.releaseDate;
    const directedBy = req.body.directedBy;
    const cinematographyBy = req.body.cinematographyBy;
    const budget = req.body.budget;
    const boxOffice = req.body.boxOffice;
    const reviewContent = req.body.reviewContent;
    const newReview = {
        title: title,
        poster: poster,
        posterFull: posterFull,
        releaseDate: releaseDate,
        directedBy: directedBy,
        cinematographyBy: cinematographyBy,
        budget: budget,
        boxOffice: boxOffice,
        reviewContent: reviewContent,
    }

    // create new review and save to DB
    reviews.create(newReview, (err, newlyCreated) => {
        console.log(newlyCreated);
        if (err) {
            console.log(err);
        } else {
            res.redirect('/reviews/1');
            // console.log('new review posted.')
        }
    })
})


// const newReviewBtn = document.querySelector('.new-review-btn');

// newReviewBtn.addEventListener('click', () => {
//     content = quill.getContents();
// });


// NEW.EJS
app.get('/reviews/r/new', (req, res) => {
    res.render('new');
})

// SHOW.EJS
app.get('/reviews/r/:id', (req, res) => {
    reviews.findById(req.params.id, (err, foundReview) => {
        if (err) {
            console.log(err);
        } else {
            res.render('show', { foundReview: foundReview })
        }
    })
})

// EDIT.EJS
app.get('/reviews/r/:id/edit', (req, res) => {
    reviews.findById(req.params.id, (err, foundReview) => {
        if (err) {
            console.log(err);
        } else {
            res.render('edit', { review: foundReview });
        }
    })
})

// UPDATE ROUTE
app.put('/reviews/:id', (req, res) => {
    reviews.findByIdAndUpdate(req.params.id, req.body.review, (err, updatedReview) => {
        if (err) {
            res.redirect('/reviews');
            console.log(err);
        } else {
            res.redirect('/reviews/r/' + req.params.id);
            // console.log('done.')
        }
    })
})

// DESTROY ROUTE
app.delete('/reviews/r/:id', (req, res) => {
    reviews.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.redirect('/reviews/1');
        } else {
            res.redirect('/reviews/1');
        }
    })
});

// CONTACT ME
app.get('/contact', (req, res) => {
    res.render('contact');
});



app.listen(port, () => {
    console.log('Hieu-Reviews is running!')
});
