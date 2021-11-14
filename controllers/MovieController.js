const Movie = require("../models/movie.js");
const paginatedResults = require("./pagination.js");


const index = (req, res, next) => {
  Movie.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occur",
      });
    });
};

const movieListGenre = (req,res,next) =>{
  Movie.find({'genre':{ $in : ['Horror','Comedy']}})
// Movie.find().sort('genre',1)
  .then(response => {
    res.json({
      response
    })
  })
  .catch(error =>{
    res.json({
      message: 'an error occur'
    })
  })

}

const show = (req, res, next) => {
  let movieId = req.body.movieId;
  Movie.findById(movieId)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occur",
      });
    });
};

const store = (req, res, next) => {
  let movie = new Movie({
    title: req.body.title,
    year: req.body.year,
    rated: req.body.rated,
    runtime: req.body.runtime,
    genre: req.body.genre,
    director: req.body.director,
  });
  if(req.body.trending){
    movie.trending = true;
  }
  if (req.files) {
    let path='';
    req.files.forEach((file, index, arr) =>{
        path = path + file.path +',';

    })
    path = path.substring(0, path.lastIndexOf(','));
    movie.imgPost = path;
  }
  movie
    .save()
    .then((response) => {
      res.json({
        message: "add movie sucessfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occur",
      });
    });
};

const showTrending = (req,res,next) =>{
  Movie.find({'trending':true})
  .then(response =>{
    res.json({
      response
    })
  })
  .catch(error =>{
    res.json({
      message:'An error occur'
    })
  })
}

const update = (req, res, next) => {
  let movieId = req.body.movieId;
  let updateData = {
    title: req.body.title,
    year: req.body.year,
    rated: req.body.rated,
    runtime: req.body.runtime,
    genre: req.body.genre,
    director: req.body.director,
  };
  Movie.findByIdAndUpdate(movieId, { $set: updateData })
    .then(() => {
      res.json({
        message: "Update movie data successfull",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occur",
      });
    });
};


const movieType = (req,res,next) =>{
  //Movie.find({'genre':{ $in : ['Horror','Comedy']}})
  
    let {type} = req.params;
    res.json({'genre':`${type}`})
    /*
    Movie.find({'genre':{$in :[ type ]}})
    .then(response => {
      res.json({
        response
      })
    })
    .catch(error =>{
        message:'An error occur'
    })
    */

  
}


const destroy = (req, res, next) => {
  let movieId = req.body.movieId;
  Movie.findByIdAndRemove(movieId)
    .then(() => {
      res.json({
        message: "delete movie successfull",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occur",
      });
    });
};

module.exports = { index, show, store, update, destroy, movieListGenre,movieType, showTrending };
