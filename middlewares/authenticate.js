const jwt = require("jsonwebtoken");
const { errorCreator } = require("../helpers/index");
const { userSchemas } = require("../models/index");
require("dotenv").config();
// =======================================================//

const authenticate = async (req, res, next) => {
  const { SECRET_KEY } = process.env;
  const { User } = userSchemas;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  // Checking for existence of Authorization headers
  if (bearer !== "Bearer") {
    next(errorCreator(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    // Checking for user's existence in DB and for the fresh token
    if (!user || user.token !== token) {
      next(errorCreator(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(errorCreator(401, "Not authorized"));
  }
};

module.exports = authenticate;
