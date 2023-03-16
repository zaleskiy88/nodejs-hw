const userSignup = require("./signup");
const userLogin = require("./login");
const userLogout = require("./logout");
const getCurrentUser = require("./current");
const updateAvatar = require("./updateAvatar");

module.exports = {
  userSignup,
  userLogin,
  userLogout,
  getCurrentUser,
  updateAvatar,
};
