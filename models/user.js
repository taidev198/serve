const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const UserSchema = new Schema({
    id: {
        type:mongoose.ObjectId,
      unique: true, index: true
    },
    fullname:{
        type:String
    },
    birth:{
        type:String,
       // index: true, unique: true, required: true
    },
    address:{
        type:String,
       // index: true, unique: true, required: true
    },
    id_department:{
        type:Number
    },
    late_date: {
        type: Array, default: new Date() 
    },
    fines: {
        type: Number
    },
    password: {
        String 
    },
})

const User = mongoose.model('User',UserSchema);
module.exports = User;