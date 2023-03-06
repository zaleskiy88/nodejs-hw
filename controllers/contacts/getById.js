const { contactSchemas } = require("../../models/index");
const { errorCreator } = require("../../helpers/index");
//  ===================================================//
const { Contact } = contactSchemas;

// Get contact by id
const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      throw errorCreator(404, "Not found");
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
