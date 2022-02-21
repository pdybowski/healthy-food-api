const jwt = require("jsonwebtoken");
const {generateAccessToken, refreshTokenExist} = require("../services/auth.service");
const {UnauthorizedError, ForbiddenError} = require("../helpers/errorHandlers");

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        throw new UnauthorizedError()
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            throw new ForbiddenError()
        }
        req.user = user
        next()
    }, null)
}

exports.refreshToken = async (req, res, next) => {
    const refreshToken = req.body.token
    if (refreshToken == null) {
        throw new UnauthorizedError()
    }
    const tokenExist = await refreshTokenExist(refreshToken);
    if (tokenExist) {
        throw new ForbiddenError()
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
            throw new ForbiddenError()
        }
        const accessToken = await generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
        next()
    }, null)
}
