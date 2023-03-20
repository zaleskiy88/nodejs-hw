const { userSchemas } = require("../../models/index");
const { errorCreator } = require("../../helpers/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// ========================================================= //

const userLogin = async (req, res, next) => {
  try {
    const { User, joiSchemas } = userSchemas;
    const { email, password } = req.body;
    const { error } = joiSchemas.loginUserSchema.validate(req.body);
    const { SECRET_KEY } = process.env;

    // checking for required fields in req.body
    if (error) {
      throw errorCreator(400, error.message);
    }

    // Finding user in the db
    const user = await User.findOne({ email });

    if (!user) {
      throw errorCreator(404, "Not found");
    }

    if (!user.verified) {
      throw errorCreator(401, "Email not verified");
    }

    // Checking if password is correct
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      errorCreator(401, "Invalid email or password");
    }

    // Creating token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "12h" });

    // Updating user token with new token
    await User.findOneAndUpdate({ email }, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userLogin;
