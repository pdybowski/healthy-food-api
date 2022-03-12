const router = require("express").Router();
const AuthControlers = require ("../controllers/auth.controller")
const validateUser = require ("../validation/user.validation.js")
const validate = require ("../middleware/validate")

//register
router.post('/register',validate(validateUser), AuthControlers.register)

//login
router.post('/login',AuthControlers.login)

//logout
router.get('/logout', AuthControlers.logout)




module.exports = router;

