const bcrypt = require("bcrypt");
const {generateAccessToken, generateRefreshToken} = require("./auth.service");

//should be stored in database
const users = []

exports.authUser = async (req, res, next) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const [accessToken, refreshToken] = await Promise.all([generateAccessToken(user), generateRefreshToken(user)])
            res.json({accessToken: accessToken, refreshToken: refreshToken})
            next()
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
}

exports.findAllUsers = async () => {
    return users;
}