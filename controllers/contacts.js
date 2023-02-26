const {
  listContacts,
  getContactById,
  deleteContactById,
  addContact,
  updateContact,
} = require("../models/contacts");
const contactSchema = require("../schemas/contacts");
const { errorCreator } = require("../helpers/index");
//  ===================================================//

// Get all contacts
const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// Get contact by id
const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

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
    const { error } = contactSchema.validate(req.body);

    if (error) {
      errorCreator(400, error.message);
    }

    const newContact = await addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

// Delete contact
const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await deleteContactById(contactId);

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
    const { error } = contactSchema.validate(req.body);
    const { contactId } = req.params;

    if (Object.keys(req.body).length === 0) {
      errorCreator(400, "Missing fields");
    }

    if (error) {
      errorCreator(404, error.message);
    }

    const updatedContact = await updateContact(contactId, req.body);

    if (updatedContact === null) {
      errorCreator(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, addNew, removeById, updateById };
