const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const {
  addContactChecker,
  updateContactChecker,
  errorCreator,
} = require("../../helpers/index");
const contactSchema = require("../../schemas/contacts");
// =========================================================== //

const router = express.Router();

// List all contacts
router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

// Get by id
router.get("/:contactId", async (req, res, next) => {
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
});

// Add new
router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    const contacts = await listContacts();

    if (error) {
      errorCreator(400, error.message);
    }

    // checks if data introduced in req.body(eg.:name,email,phone) is already existing in the list
    addContactChecker(contacts, req.body);
    //
    const newContact = await addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// Remove
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await listContacts();
    const idsArr = contacts.map((el) => el.id);

    if (!idsArr.includes(contactId)) {
      errorCreator(404, "Not found");
    }

    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

// Update
router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    const { contactId } = req.params;
    const contacts = await listContacts();

    if (Object.keys(req.body).length === 0) {
      errorCreator(400, "Missing fields");
    }

    if (error) {
      errorCreator(404, error.message);
    }

    // Checks if data introduced in req.body(eg.:name,email,phone) is already existing in the list.
    // This func excludes object wich is being modified
    updateContactChecker(contacts, req.body, contactId);
    //
    const updatedContact = await updateContact(contactId, req.body);

    if (updatedContact === null) {
      errorCreator(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
