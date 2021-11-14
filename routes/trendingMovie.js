const express = require('express');
const route = express.Router();
const MovieController = require('../controllers/MovieController.js');



route.get('movie/day',MovieController.trendingmovieday)
module.exports = route;