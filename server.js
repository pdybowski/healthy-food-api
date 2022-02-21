require('dotenv').config()

const express = require('express')
const app = express()
const {authenticateToken, refreshToken} = require("./controllers/auth.controller");
const {deleteToken, loginUser, setUser, authUser, authRole} = require("./services/auth.service");
const {createUser, findAllUsers} = require("./services/users.service");
const {findUserRecipes, findAllRecipes} = require("./services/recipe.service");
const {ROLE} = require("./data");

app.use(express.json())

app.get('/users', setUser, authUser, authRole(ROLE.ADMIN),  async (req, res) => {
    res.json(await findAllUsers())
})

app.post('/users', createUser, (req, res) => {
})

app.get('/recipes', async (req, res) => {
    res.json(await findAllRecipes())
})

app.get('/user/recipes', setUser, authUser, authenticateToken, async (req, res) => {
    res.json(await findUserRecipes(req.user))
})

app.post('/token', refreshToken, (req, res) => {
})

app.delete('/logout', deleteToken, (req, res) => {
})

app.post('/login', setUser, loginUser, async (req, res) => {
})

app.listen(process.env.PORT)