const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const AdminSchema = new Schema({
    id: {
        type:Number,
        unique: true, index: true
    },
    username:{
        type: String
    },
    password: {
        type: String
    },
})



const admin = mongoose.model('admin',AdminSchema);
module.exports = admin;