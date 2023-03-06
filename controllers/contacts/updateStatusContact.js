const { contactSchemas } = require("../../models/index");
const { errorCreator } = require("../../helpers/index");
//  ===================================================//
const { Contact, joiSchemas } = contactSchemas;
// Update favorite status
const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = joiSchemas.toggleFavoriteSchema.validate(req.body);
    const { contactId } = req.params;

    if (error) {
      throw errorCreator(400, "missing field favorite");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { returnDocument: "after" }
    );

    if (updatedContact === null) {
      throw errorCreator(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
