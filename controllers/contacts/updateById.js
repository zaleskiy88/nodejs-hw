const { Contact, joiSchemas } = require("../../models/index");
const { errorCreator } = require("../../helpers/index");
//  ===================================================//

// Update contact
const updateById = async (req, res, next) => {
  try {
    const { error } = joiSchemas.addContactSchema.validate(req.body);

    const { contactId } = req.params;

    if (error) {
      errorCreator(400, error.message);
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { returnDocument: "after" }
    );

    if (updatedContact === null) {
      errorCreator(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
