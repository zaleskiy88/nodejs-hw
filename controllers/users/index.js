const userSignup = require("./signup");
const userLogin = require("./login");
const userLogout = require("./logout");
const getCurrentUser = require("./current");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendEmailVerification = require("./resendVerification");

module.exports = {
  userSignup,
  userLogin,
  userLogout,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
  resendEmailVerification,
};
