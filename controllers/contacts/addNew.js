const { contactSchemas } = require("../../models/index");
const { errorCreator } = require("../../helpers/index");
//  ===================================================//
const { Contact, joiSchemas } = contactSchemas;

// Add new contact
const addNew = async (req, res, next) => {
  try {
    const { error } = joiSchemas.addContactSchema.validate(req.body);
    const { _id } = req.user;

    if (error) {
      throw errorCreator(400, error.message);
    }

    const newContact = await Contact.create({ ...req.body, owner: _id });

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = addNew;
