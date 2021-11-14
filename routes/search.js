const express = require('express');
const paginatedResults = require('../controllers/pagination');
const Movie = require('../models/movie');
const route = express.Router();

route.get('/movie',paginatedResults(Movie,'title'),(req,res,next)=>{
    res.json(res.paginatedResults)
})

module.exports = route;