const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//should be from database
let {refreshTokens, users} = require('../data')

generateAccessToken = async (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'}, null)
}

generateRefreshToken = async (user) => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, null, null);
    refreshTokens.push(refreshToken);
    return refreshToken
}

exports.refreshTokenExist = async (refreshToken) => {
    return !refreshTokens.includes(refreshToken);
}

exports.deleteToken = (req, res, next) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
    next()
}

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
