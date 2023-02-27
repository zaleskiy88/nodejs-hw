const { Contact, joiSchemas } = require("../models/contact");
const { errorCreator } = require("../helpers/index");
//  ===================================================//

// Get all contacts
const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

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

// Delete contact
const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndDelete({ _id: contactId });

    if (!result) {
      errorCreator(404, "Not found");
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

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

// Update favorite status
const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = joiSchemas.toggleFavoriteSchema.validate(req.body);
    const { contactId } = req.params;

    if (error) {
      errorCreator(400, "missing field favorite");
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

module.exports = {
  getAll,
  getById,
  addNew,
  removeById,
  updateById,
  updateStatusContact,
};
