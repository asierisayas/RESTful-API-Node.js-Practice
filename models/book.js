var mongoose = require('mongoose');


var bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    create_date: {
        type: Date, 
        default: Date.now
    }
})

var Book = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = function(callback, limit) {
    Book.find(callback).limit(limit);
}

//Get Book by Name
module.exports.getBookByTitle = function(title, callback) {
    Book.find({title: title}, callback);
}

//Add Book
module.exports.addBook = function(book, callback) {
    Book.create(book, callback);
}