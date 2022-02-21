const bcrypt = require("bcrypt");

//should be from database
const {users} = require('../data')

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