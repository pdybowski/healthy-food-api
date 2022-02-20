require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const recipes = [{
    username: 'tom',
    title: 'recipe 1',
},
    {
        username: 'jim',
        title: 'recipe 2'
    }]

app.get('/recipes', authenticateToken, (req, res) => {
    res.json(recipes.filter(recipe => recipe.username === req.user.name))
})

app.post('/login', (req, res) => {
    //authenticate user

    const username = req.body.username
    const user = {name: username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(process.env.PORT)