const authService = require("../services/auth.service");
const AuthControlers = require ("../controllers/AuthConstrollers")

const responseWithToken = (res, data) => {
  return res.header("X-Auth-Token", data.token).json(data);
};

exports.login = (req, res, next) => {
  try {
    const data = await authService.login(req.body); // TODO probably broken - its just an example
    return responseWithToken(res, data); //TODO
  } catch (error) {
    next(error);
  }
};

// TODO register
// TODO logout

module.exports = router
