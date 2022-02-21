const bcrypt = require("bcrypt");
const {saveUser} = require("./users.service");

const {ROLE} = undefined //TODO should be from database or object
exports.saveUser = async (user) => {
    //TODO
}

exports.findAllUsers = async () => {
    //TODO
}

exports.findUserById = async (userId) => {
    //TODO
}

exports.createUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {id: req.body.id, name: req.body.name, password: hashedPassword, role: ROLE.USER}
        await saveUser(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
}
