const { errorCreator, sendEmail } = require("../../helpers");
const { userSchemas } = require("../../models/index");
require("dotenv").config("");
// ======================Resending email verification===========================================//

const { BASE_URL } = process.env;

const resendEmailVerification = async (req, res, next) => {
  try {
    const { User, joiSchemas } = userSchemas;
    const { error } = joiSchemas.verificationEmailSchema.validate(req.body);
    const { email } = req.body;

    if (error) {
      throw errorCreator(400, error.message);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw errorCreator(404, "Not found");
    }

    if (user.verified) {
      throw errorCreator(400, "Verification has already been passed");
    }

    const verificationEmail = {
      to: email,
      subject: "Email verification",
      html: `
      <h1>Follow the link to verify your email adress</h1>
      <span>Link:</span> <a target=_blank href="${BASE_URL}/api/users/verify/${user.verificationToken}">
      Click here to verify your email
      </a>`,
    };

    await sendEmail(verificationEmail);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

// =================================================================//

module.exports = resendEmailVerification;
