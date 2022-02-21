const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {findUserById} = require("./users.service");
const {UnauthorizedError, ForbiddenError, BadRequestError} = require("../helpers/errorHandlers");

let {refreshTokens} = undefined //TODO should be from database

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

exports.setUser = (req, res, next) => {
    const userId = req.body.id
    if (userId) {
        req.user = findUserById(userId)
    }
    next()
}

exports.authUser = (req, res, next) => {
    if (req.user == null) {
        throw new ForbiddenError('You need to sign in')
    }
    next()
}

exports.authRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            throw new UnauthorizedError('Not allowed')
        }
        next()
    }
}

exports.loginUser = async (req, res, next) => {
    if (req.user == null) {
        throw new BadRequestError('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, req.user.password)) {
            const [accessToken, refreshToken] = await Promise.all([generateAccessToken(req.user), generateRefreshToken(req.user)])
            res.json({accessToken: accessToken, refreshToken: refreshToken})
            next()
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
}
