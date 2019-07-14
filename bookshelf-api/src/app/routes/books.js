const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// add new book
router.post("/newBook", (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    bookshelfNo: req.body.bookshelfNo
  });
  book.save().then(result => {
    res.status(201).json({ message: "Book added", bookId: result._id });
  });
});

// get all books
router.get("", (req, res, next) => {
  Book.find().then(books => {
    res.status(200).json({ message: "Books send", books: books });
  });
});

// update book
router.put('/:id', (req, res, next) => {
  const book = new Book({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    bookshelfNo: req.body.bookshelfNo, 
  })

  Book.updateOne({_id: req.params.id }, book).then(result => {
    console.log(result);
    res.status(200).json({message: 'Book updated successful!!'});
  })
})

// get one book
router.get("/:id", (req, res, next) => {
  Book.findById(req.params.id).then(book => {
    if(book) {
      res.status(200).json({message: 'Book found', book: book})
    } else {
      res.status(404).json({message: 'Book not found'})
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Book.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Book deleted!" });
  });
});

module.exports = router;