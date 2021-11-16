const User = require('../models/user.js');
const Department = require('../models/department.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req,res,next) =>{
    bcrypt.hash(req.body.password,10, (err,hashedPass) =>{
        if(err){
            res.json({
                error:err
            })
        }
       
        let user = new User({
            fullname:req.body.fullname,
            birth:req.body.birth,
            address:req.body.address,
            id_department:req.body.id_department,
            late_date:req.body.late_date,
            fines:req.body.fines,
            password:hashedPass
        })
        user.save()
        .then(user =>{
            res.json(user)
        })
        .catch(err =>{
            res.json({
                message: 'An error occur'
            })
        })
    })
    
}

const login = (req,res,next) =>{
    
    var id = req.body.fullname;
    var password = req.body.password;

    User.findOne({"fullname": id})
    .then(user =>{
        if(user){
            console.log(user);
            // bcrypt.compare(password, user.id_department, function(err, result){
            //     if(err){
            //         res.json({
            //             error: err
            //         })
            //     }})
                if(password == user.password){
                    let token = jwt.sign({name: user.name}, 'AzQ,PI)0(',{expiresIn:'1h'})
                    res.json({
                        message: 'login sucessfully',
                        token,
                        user
                    })
                }else{
                    res.json({
                        message: 'password does not match'
                    })
                }
            // })
        }else{
            res.json({
                message:'User not found !'
            })
        }
    })
}

const update = (req, res, next) => {
    var filter = {_id: req.body.id}
    req.body.name = "456"
    User.findOneAndUpdate(filter, {"name" :req.body.name},function (err, user) {
        if (err) {
         err.type = 'database';
         callback(err);
        }
        res.json(user)
       });
}

//get all users from id_department
const getUserOfDepart = (req, res, next) => {
    const id = req.body.id;
    console.log(id);
    User.
    find({ id_department: id }, function (err, users) {
       var Users = {
        "staffs": users
    }
        res.json(Users)
      });
}

module.exports = {register,login , update, getUserOfDepart}