const jwt = require("jsonwebtoken");
const {generateAccessToken, refreshTokenExist} = require("../services/auth.service");

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    }, null)
}

exports.refreshToken = async (req, res, next) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    const tokenExist = await refreshTokenExist(refreshToken);
    if (tokenExist) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = await generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
        next()
    }, null)
}