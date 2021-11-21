const Rule = require('../models/rule.js');

const getRule = (req,res, next) => {
    Rule.findOne({"start_date": 2}).then( (r) => {
        if(r) {
           var rule = {
            "rule": r
        }

        res.json(rule);
       
        }
        else 
        res.json({
            message:'Rule not found !'
        })
         }); 
}

const addRule = (req,res, next) => {
    let rule = new Rule({
        id: 1,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        start_time:req.body.start_time,
        end_time:req.body.end_time,
        fines:req.body.fines
    });
    rule.save()
    .then(rule =>{
        res.json(rule)
    })
    .catch(err =>{
        res.json({
            message: 'An error occur'
        })
    });
}

module.exports = {getRule, addRule}