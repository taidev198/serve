const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const DepartmentSchema = new Schema({
    id: {
        type:Number,
      unique: true, index: true
    },
    name:{
        type:String
    },
    quanlity: {
        type: Number
    },
   
})



const Department = mongoose.model('department',DepartmentSchema);
module.exports = Department;