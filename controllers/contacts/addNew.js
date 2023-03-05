const { Contact, joiSchemas } = require("../../models/index");
const { errorCreator } = require("../../helpers/index");
//  ===================================================//

// Add new contact
const addNew = async (req, res, next) => {
  try {
    const { error } = joiSchemas.addContactSchema.validate(req.body);

    if (error) {
      errorCreator(400, error.message);
    }

    const newContact = await Contact.create(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = addNew;
