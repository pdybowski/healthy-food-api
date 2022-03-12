const Joi = require("joi");

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(20).required(),
        surname: Joi.string().trim().min(2).max(20).required(),
        username: Joi.string().trim().min(2).max(10).required(),
        password: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().trim().regex(/^[0-9]{9,12}$/),
        isAdmin: Joi.boolean(),
    })
    return schema.validate(user)
}

module.exports = validateUser;