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
    
    var id = req.body.id;
    var password = req.body.password;

    User.findOne({"id": id})
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
                    user._id = user.id
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

    User.findOne({ "id": "fvbsfbv" })
    .then((u) => {
      res.json(u);
    })
    .catch((error) => {
      res.json({
        message: "An error occur",
      });
    });

    // User.updateOne({"id" :req.body.id},{$set:{             "fullname" :req.body.fullname,
    //                                                         "address" : req.body.address,
    //                                                          "avatar" : req.body.avatar,
    //                                                           "bỉrth" : req.body.bỉrth,
    //                                                           "gender" : req.body.gender
    //                                                         }},function (err, user) {
    //     if (err) {
    //      err.type = 'database';
    //      callback(err);
    //     }
    //     res.json(user)
    //    });
}

const deleteUser = (req, res, next) => {
    var fullname =  req.body.fullname;
    
    User.findOneAndDelete({"fullname" : fullname},function (err, user) {
        if (err) {
         err.type = 'database';
         callback(err);
        }
        res.json({
            message:'Success'
        })
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

module.exports = {register,login , update, deleteUser, getUserOfDepart}