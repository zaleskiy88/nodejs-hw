const { userSchemas } = require("../../models/index");
const { errorCreator } = require("../../helpers/index");
// =======================================================//
const { User } = userSchemas;

const userLogout = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      errorCreator(401, "Not authorized");
    }

    await User.findByIdAndUpdate(id, { token: "" });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = userLogout;
