const { userSchemas } = require("../../models/index");
const { errorCreator, sendEmail } = require("../../helpers/index");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
require("dotenv").config("");
// ========================================================//
const { BASE_URL } = process.env;

// ================ User signup/registration===============//

const userSignup = async (req, res, next) => {
  try {
    const { User, joiSchemas } = userSchemas;
    const { email, password } = req.body;
    const { error } = joiSchemas.addUserSchema.validate(req.body);

    // checking for required fields(Joi) in req.body
    if (error) {
      errorCreator(400, error.message);
    }

    // Checking if user already in the db
    const user = await User.findOne({ email });

    if (user) {
      errorCreator(409, "Email in use");
    }

    // Creating new user
    const newUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(password, 10), // Hashing password
      avatarURL: gravatar.url(email), // Creating default avatar
      verificationToken: v4(), // Generating verification token
    });

    // Creating verification email for being send to the new user
    const verificationEmail = {
      to: email,
      subject: "Email verification",
      html: `
      <h1>Follow the link to verify your email adress</h1>
     <span>Link:</span> <a target=_blank href="${BASE_URL}/api/users/verify/${newUser.verificationToken}">
      Click here to verify your email
      </a>`,
    };

    await sendEmail(verificationEmail);

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
