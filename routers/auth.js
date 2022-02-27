const router = require("express").Router();
const User = require("../models/user.model")
const bcrypt = require ("bcryptjs")
const jwt = require("jsonwebtoken")
require ("dotenv").config();

const AuthControlers = require ("../controllers/AuthConstrollers")



router.post('/Register', AuthControlers.register)


router.post('/Login',AuthControlers.login)


router.get('/logout', AuthControlers.logout)




module.exports = router;

