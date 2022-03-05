const router = require("express").Router();
const User = require("../models/user.model")
const bcrypt = require ("bcryptjs")
const jwt = require("jsonwebtoken")
require ("dotenv").config();

const AuthControlers = require ("../controllers/auth.controller")

//Register
router.post('/Register', AuthControlers.register)

//Login
router.post('/Login',AuthControlers.login)

//Logout
router.get('/logout', AuthControlers.logout)




module.exports = router;

