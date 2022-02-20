const jwt = require("jsonwebtoken");

//should be stored in database
let refreshTokens = []

exports.generateAccessToken = async (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'}, null)
}

exports.generateRefreshToken = async (user) => {
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