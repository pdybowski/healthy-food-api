require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

const validate = require('./middleware/validate')


const {json} = require("express");
const { validateMealPlan } = require('./models/meal-plan.model')

app.post('/test', validate(validateMealPlan), (req,res) => {
    res.send('ok')
})

app.listen(3000)