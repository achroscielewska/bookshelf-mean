const express = require('express');
const bodyParser = require('body-parser');

const environment = require('../environment/environment');
const mongoose = require('mongoose');

const URL_DB = environment.db_url;

const booksRoutes = require('./routes/books');
const URL_API_BOOKS = '/api/books';

const app = express();

// connection to mongoDB
mongoose
    .connect(URL_DB, { useNewUrlParser: true })
    .then(() => { console.log("Connected to database!"); })
    .catch(() => { console.log("Connection to mongoDB failed!"); });

// CORS configuration https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(URL_API_BOOKS, booksRoutes);

module.exports = app;