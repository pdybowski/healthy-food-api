const AuthService = require("../services/auth.service")

const responseWithToken = (res, data) => {
  return res.header("X-Auth-Token", data.token).json(data);
};

exports.register = async (req, res, next) =>{
  try {
    const data = await AuthService.register(req.body);
    return responseWithToken(res, data);
  }catch(error){
    next(error);
  }
};

exports.login = async (req, res, next) =>{
  try {
    const data = await AuthService.login(req.body);
    res.header("X-Auth-Token", data.token).json(data)
  }catch(error){
    next(error);
  }
};

exports.logout = async (req, res, next) =>{
  try {
    const { params } = req;
    await AuthService.logout(params);
    res.status(200).send(true)
  } catch(error){
    next(error);
  }
};





