const express = require("express");
const MovieController = require("../controllers/MovieController.js");
const  upload  = require ("../middleware/upload");
const authenticate = require('../controllers/AuthController');
const { route } = require("./users.js");
const paginatedResults = require("../controllers/pagination.js");
const Movie = require("../models/movie.js");

const router = express.Router();

//router.get("/",authenticate);
router.get("/",MovieController.index);
router.post("/show", MovieController.show);
router.post("/store", upload.array('imgPost[]'),MovieController.store);
router.post("/update", MovieController.update);
router.post("/delete",  MovieController.destroy);
router.get('/:type',paginatedResults(Movie,'genre'),(req,res,next)=>{
    res.json(res.paginatedResults)
    
})
module.exports = router
