const { errorCreator } = require("../../helpers");
const { userSchemas } = require("../../models/index");

// ======================User's email verification==============================================//
const verifyEmail = async (req, res, next) => {
  try {
    const { User } = userSchemas;
    const { verificationToken } = req.params;

    const user = await User.findOneAndUpdate(
      { verificationToken },
      { verified: true, verificationToken: null }
    );

    if (!user) {
      throw errorCreator(404, "User not found");
    }

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};
// ====================================================================//

module.exports = verifyEmail;
