const winston = require("winston");
const HttpStatusCode = require("../helpers/httpStatusCode");

const sendError = (res, statusCode, errorMessage) => {
  res.status(statusCode).json({
    message: errorMessage,
  });
};

module.exports = function (err, res, res, next) {
  winston.error(err.message, { metadata: err });

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  // log the exception
  err.statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;

  if (err.isOperational) {
    sendError(res, err.statusCode, err.message);
  } else {
    if (err.name === "CastError") {
      sendError(
        res,
        HttpStatusCode.BAD_REQUEST,
        `Nieprawidłowa wartość ${err.value}`
      );

      return;
    }

    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors)
        .map((el) => el.message)
        .join(".\n");

      sendError(res, HttpStatusCode.BAD_REQUEST, errors);

      return;
    }

    sendError(res, HttpStatusCode.INTERNAL_SERVER_ERROR, "Coś poszło nie tak!");
  }
};
