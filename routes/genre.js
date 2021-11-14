const express = require('express');
const route = express.Router();
const MovieController = require('../controllers/MovieController');

route.get('/list',MovieController.movieListGenre);

module.exports = route