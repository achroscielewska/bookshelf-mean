const express = require("express");
const multer = require("multer"); 
const router = express.Router();
const Book = require("../models/book");

const MINE_TYPE_MAP = {
  "image/png" : "png",
  "image/jpeg" : "jpg",
  "image/jpg" : "jpg", 
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MINE_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mine type");
    if(isValid) {
      error = null;
    }
    cb(error, "C:/Users/achroscielewska/_PROJEKTY/MOJE/bookshelf-mean/bookshelf-api/src/app/images");
  }, 
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MINE_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
})

// add new book
router.post("/newBook", multer({storage: storage}).single("image") ,(req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const bookObject = JSON.parse(req.body.book)
  const book = new Book({
    title: bookObject.title,
    description: bookObject.description,
    bookshelfNo: bookObject.bookshelfNo,
    imagePath: url + "/images/" + req.file.filename
  });

  book.save().then(result => {
    res.status(201).json({ message: "Book added", book: result });
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