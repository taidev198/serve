const Department = require('../models/department.js');

const User = require('../models/user.js');


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

module.exports = {getDepartments, addDepartment}