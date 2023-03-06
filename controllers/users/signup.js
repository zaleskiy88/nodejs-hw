const { userSchemas } = require("../../models/index");
const { errorCreator } = require("../../helpers/index");
const bcrypt = require("bcrypt");
// ========================================================//

// ================ User signup/registration===============//

const userSignup = async (req, res, next) => {
  try {
    const { User, joiSchemas } = userSchemas;
    const { email, password } = req.body;
    const { error } = joiSchemas.addUserSchema.validate(req.body);

    // checking for required fields in req.body
    if (error) {
      errorCreator(400, error.message);
    }

    // Checking if user already in the db
    const user = await User.findOne({ email });
    if (user) {
      errorCreator(409, "Email in use");
    }

    const newUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(password, 10), // Hashing password
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userSignup;
