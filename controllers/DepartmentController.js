const Department = require('../models/department.js');

const Rule = require('../models/rule.js');


const getDepartments = (req,res, next) => {
    Department.find({}).then(function (departs) {
        var departments = {
            "departments": departs
        }

        res.json(departments);
        });
}

const addDepartment = (req,res, next) => {
    let department = new Department({
        id:req.body.id,
        name:req.body.name,
        quanlity:req.body.quanlity,
    });
    department.save()
    .then(department =>{
        res.json(department)
    })
    .catch(err =>{
        res.json({
            message: 'An error occur'
        })
    });
}

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
    Rule.findOne({"id": 1}).then( (r) => {
        if(r) {
            Rule.updateOne({"id" :1 },{$set:{             "start_date" :req.body.start_date,
                                                            "end_date" : req.body.end_date,
                                                             "start_time" : req.body.start_time,
                                                              "end_time" : req.body.end_time,
                                                              "fines" : req.body.fines
                                                            }},function (err, rule) {
        if (err) {
         err.type = 'database';
         callback(err);
        }
        res.json(rule)
       });
        }
        else {
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
         });

   
}


module.exports = {getDepartments, addDepartment, getRule, addRule}