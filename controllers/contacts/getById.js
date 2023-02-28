const { Contact } = require("../../models/index");
const { errorCreator } = require("../../helpers/index");
//  ===================================================//

// Get contact by id
const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      errorCreator(404, "Not found");
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
