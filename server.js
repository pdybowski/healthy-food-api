require('dotenv').config()

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const {authenticateToken, refreshToken} = require("./controllers/auth.controller");
const {generateAccessToken, generateRefreshToken, deleteToken} = require("./services/auth.service");
const {findUserRecipes, findAllRecipes} = require("./services/recipe.service");

//should be stored in database
const users = []

findAllUsers = async () => {
    return users;
}

app.use(express.json())

app.get('/users', async (req, res) => {
    res.json(await findAllUsers())
})

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.get('/recipes', async (req, res) => {
    res.json(await findAllRecipes())
})

app.get('/user/recipes', authenticateToken, async (req, res) => {
    res.json(await findUserRecipes(req.user))
})

app.post('/token', refreshToken, (req, res) => {
})

app.delete('/logout', deleteToken, (req, res) => {
})

app.post('/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const [accessToken, refreshToken] = await Promise.all([generateAccessToken(user), generateRefreshToken(user)])
            res.json({accessToken: accessToken, refreshToken: refreshToken})
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
})

app.listen(process.env.PORT)