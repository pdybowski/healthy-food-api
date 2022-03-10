const router = require("express").Router();
const AuthControlers = require ("../controllers/auth.controller")

//register
router.post('/register', AuthControlers.register)

//login
router.post('/login',AuthControlers.login)

//logout
router.get('/logout', AuthControlers.logout)




module.exports = router;

