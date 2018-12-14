var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

//Connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');

app.get('/', function(req, res) {
    res.send('Use /api/books or /api/genres');
});

app.get('/api/genres', function(req, res) {
    Genre.getGenres(function(err, genres) {
        if (err) {
          throw err;
        }
        res.json(genres);
    });
});

//Get Books
app.get('/api/books', function(req, res) {
    Book.getBooks(function(err, books) {
        if (err) {
          throw err;
        }
        console.log(JSON.stringify(books, null, 3));
        res.json(books);
    });
});

//Get Book by Title
app.get('/api/books/:title', function(req, res) {
    Book.getBookByTitle(req.params.title, function(err, books) {
        if (err) {
          throw err;
        }
        console.log(JSON.stringify(books, null, 3));
        res.json(books);
    });
});

//Add Book
app.post('/api/books', function(req, res) {
    console.log(req.body);
    Book.addBook(req.body, function(err, success) {
        if (err) {
            throw err;
        }
        res.json(success.create_date);
    })
});


//Add Genre
app.post('/api/genres', function(req, res) {
    console.log(req.body);
    Genre.addGenre(req.body, function(err, success) {
        if (err) {
            throw err;
        }
        res.json(success);
    });
});

app.listen(3000);
console.log('Running on port 3000...')