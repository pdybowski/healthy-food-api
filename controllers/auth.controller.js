const authService = require("../services/auth.service");

const responseWithToken = (res, data) => {
  return res.header("X-Auth-Token", data.token).json(data);
};

exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body); // TODO probably broken - its just an example
    return responseWithToken(res, data); //TODO
  } catch (error) {
    next(error);
  }
};

// TODO register
// TODO logout
