const HttpStatusCode = require("./httpStatusCode");

class ApiError extends Error {
  constructor(statusCode, message, ...params) {
    super(message, ...params);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.message = message;
    this.date = new Date();
    this.isOperational = true;
  }
}

class UnauthorizedError extends ApiError {
  constructor(message, ...params) {
    super(HttpStatusCode.UNAUTHORIZED, message, ...params);

    this.name = "UnauthorizedError";
  }
}

class BadRequestError extends ApiError {
  constructor(message, ...params) {
    super(HttpStatusCode.BAD_REQUEST, message, ...params);

    this.name = "BadRequestError";
  }
}

class ConflictError extends ApiError {
  constructor(message, ...params) {
    super(HttpStatusCode.CONFLICT, message, ...params);

    this.name = "ConflictError";
  }
}

class ForbiddenError extends ApiError {
  constructor(message, ...params) {
    super(HttpStatusCode.FORBIDDEN, message, ...params);

    this.name = "ForbiddenError";
  }
}

class NotFoundError extends ApiError {
  constructor(message, ...params) {
    super(HttpStatusCode.NOT_FOUND, message, ...params);

    this.name = "NotFoundError";
  }
}

class InernalServerError extends ApiError {
  constructor(message, ...params) {
    super(HttpStatusCode.INTERNAL_SERVER_ERROR, message, ...params);

    this.name = "InternalServerError";
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  InernalServerError,
};
