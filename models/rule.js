const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const RuleSchema = new Schema({
    id: {
        type:Number,
        unique: true, index: true
    },
    start_date:{
        type: Number
    },
    end_date: {
        type: Number
    },
    start_time: {
        type: String
    },
    end_time: {
        type: String
    },
    fines: {
        type: Number
    },
   
})



const Rule = mongoose.model('rule',RuleSchema);
module.exports = Rule;