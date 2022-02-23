const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require ("bcryptjs")
const jwt = require("jsonwebtoken")

const AuthControlers = require ("../controllers/AuthConstrollers")

router.post('/SignUp', AuthControlers.SignUp)



// router.post("/SignUp", async (req, res) => {
//     try {
//       const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//       });
  
//       const user = await newUser.save();
//       res.json(user);
//     } catch (err) {
//       res.status(400).send(err);
//     }
//   });
//Sign In
// router.post("/SignIn",async(req,res)=>{
//     try{
//         const user= await User.findOne({username: req.body.username})
//     }catch{
//         console.log(err);
//     }
// })

module.exports = router;

