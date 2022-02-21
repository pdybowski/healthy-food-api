const jwt = require("jsonwebtoken");
const {
  BadRequestError,
  UnauthorizedError,
  InernalServerError,
} = require("../helpers/errorHandlers");
const { hashInput, hashCompare } = require("../hash");

let { refreshTokens } = undefined; //TODO should be from database

generateAccessToken = async (user) => {
  return jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" },
    null
  );
};

generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    user,
    process.env.REFRESH_TOKEN_SECRET,
    null,
    null
  );
  refreshTokens.push(refreshToken);
  return refreshToken;
};

exports.login = async (req, res, next) => {
  //TODO validate req.body object and response with error if doesnt exist

  const bcrypt = await hashCompare(req.body.password, req.user.password);
  if (!bcrypt) throw new UnauthorizedError("Invalid email or password.");

  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(req.user),
    generateRefreshToken(req.user),
  ]);

  return { accessToken: accessToken, refreshToken: refreshToken }; //TODO probably we we should return also userRole
};
