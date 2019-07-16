    
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require:  true },
    bookshelfNo: { type: String, require:  true },
    imagePath: { type: String, require:  true }
});

module.exports = mongoose.model('Book', bookSchema);