const { updateUserService } = require("../services/updateUser.service");

exports.updateUser = async (req, res, next) => {
  const updatedData = req.body;
  updateUserService(req.body)
    .then((result) => {
      res.send(result);
      next();
    })
    .catch((err) => {
      res.status(500).send(err);
      next();
    });
};
