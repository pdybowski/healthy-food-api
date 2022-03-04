const { resetService, findService } = require("../services/auth-user.service");

exports.reset = async (req, res, next) => {
  const { email } = req.body;
  resetService(email)
    .then((result) => {
      res.send(result);
      next();
    })
    .catch((err) => {
      res.status(404).send(err);
      next();
    });
};

exports.resetId = async (req, res, next) => {
  const { id, token } = req.params;
  findService(id, token)
    .then((result) => {
      res.send(JSON.stringify(result));
      next();
    })
    .catch((err) => {
      res.status(404).send(err);
      next();
    });
};

exports.resetPass = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;
  resetPassService(id, password)
    .then((result) => {
      res.send(result);
      next();
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};
