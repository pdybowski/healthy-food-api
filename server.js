require('dotenv').config()

const express = require('express')
const app = express()
const {authenticateToken, refreshToken} = require("./controllers/auth.controller");
const {generateAccessToken, generateRefreshToken, deleteToken} = require("./services/auth.service");
const {findUserRecipes, findAllRecipes} = require("./services/recipe.service");

app.use(express.json())

app.get('/recipes', async (req, res) => {
    res.json(await findAllRecipes())
})

app.get('/user/recipes', authenticateToken, async (req, res) => {
    res.json(await findUserRecipes(req.user))
})

app.post('/token', refreshToken, (req, res) => {
})

app.delete('/logout', (req, res) => {
    deleteToken(req, res)
})

app.post('/login', async (req, res) => {
    //authenticate user

    const username = req.body.username
    const user = {name: username}
    const [accessToken, refreshToken] = await Promise.all([generateAccessToken(user), generateRefreshToken(user)])
    res.json({accessToken: accessToken, refreshToken: refreshToken})
})

app.listen(process.env.PORT)