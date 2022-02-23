const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require ("bcryptjs")
const jwt = require("jsonwebtoken")

const SignUp = (req,res,next) => {
    bcrypt.hash(req.body.password, function(err, hashedPass){
        if(err) {
            res.json({
                error:err
            })
        }
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        user.save()
        .then(user => {
            res.json({
                message: 'User Added Succesfully!'
            })
        })
        .catch(error =>{
            res.json({
                message: 'An error occured!'
            })
        })
    

    })

}

module.exports = {
    SignUp
}