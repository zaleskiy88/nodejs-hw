const { isValidObjectId } = require("mongoose");
const { errorCreator } = require("../helpers/index");
// ======================================================== //

const isIdValId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(errorCreator(400, `id: "${contactId}" is not valid`));
  }

  next();
};

module.exports = isIdValId;
