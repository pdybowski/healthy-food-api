const router = require("express").Router();
const User = require("../models/user.model")
const bcrypt = require ("bcryptjs")
const jwt = require("jsonwebtoken");
const { authRefreshToken } = require("../middleware/auth");
const res = require("express/lib/response");

const register = async (req,res) => {
    const {username, email, password} = req.body;
    console.log(email)
    console.log(User)
    console.log(password)

    const alreadyExistUser = await User.findOne(  { email:email} )
    .catch(
        (err) => {
            console.log("Error", err);
        }
    );console.log(alreadyExistUser)
    console.log(req.body)
    if (alreadyExistUser) {
        return res.status(409).json({ message: "User with email already exists!" });
      }
    
      const newUser = new User({ username, email, password,phoneNumber:req.body.phoneNumber });
      const savedUser = await newUser.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Cannot register user at the moment!" });
      });
    
      if (savedUser) res.set("x-auth-token","registerToken").json({ message: "Thanks for registering" });
    };
    

  const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)

    const userWithEmail = await User.findOne({ email: email } ).catch(
      (err) => {
        console.log("Error: ", err);
      }
    );

    if(!userWithEmail)
    return res
    .status(400)
    .json({ message: "Email or password does not match!"});

    if (userWithEmail.password !== password)
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });
      const jwtToken = jwt.sign(
        { id: userWithEmail.id, email: userWithEmail.email },
        process.env.JWT_SECRET
      );
    
          res.json({ message: "Welcome Back!", token: jwtToken });
      };

      const logout = async(req,res) =>{
        findOneAndDelete({User:req.User, type:"login"}, (err,doc)=>{
          if(err)return res.status(401).json({
            status:false,
            message:"Server error, logout failed",
          })
          return res.status(200).json({
            status:true,
            message:"Logout succesfully"
          })
        })
      }


      module.exports = {
        register,
        login,
        logout
    }
    
    
    
  
 