const updateUserService = require("../services/updateUser.service");

exports.updateUser = async (req, res, next) => {
  const updatedData = req.body;
  updateUserService.updateUserService(req.body)
    .then((result) => {
      res.send(result);
      next();
    })
    .catch((err) => {
      res.status(500).send(err);
      next();
    });
};

exports.deleteUser = async (req, res, next) => {
    try {
        await updateUserService.deleteUser(req.params.id);
        res.status(200).json({message: "Deleted user"});
    } catch (error) {
        next(error);
    }
};
