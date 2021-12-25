const express = require ("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require ("./routes/users.js");
const authRoute = require('./routes/auth.js')
const department = require('./routes/department.js');
const morgan = require('morgan');
//const trendingMovie = require('./routes/trendingMovie.js');


const app = express();
const PORT = process.env.PORT || 5000;



mongoose.connect("mongodb://localhost:27017/smartcardapi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error',err =>{
    console.log(err);
});
db.once('open', () => console.log("connected to monngo db"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads',express.static('uploads'));
app.use(morgan('dev'));
app.use('/user',authRoute);
app.use('/users', userRoutes)
app.use("/department",department );
app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
