const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
  },
  year: {
    type: String,
  },
  rated: {
    type: Number,
  },
  runtime: {
    type: String,
  },
  genre: {
    type: Array,
  },
  director: {
    type: String,
  },
  imgPost:{
    type: String,
  },
  trending:{
    type: Boolean
  }
});



const Movie = mogoose.model("Movie", movieSchema);

module.exports = Movie;