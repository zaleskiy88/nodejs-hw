const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
// =========================================================== //

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el._id === contactId);

  return contact || null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { _id: v4(), ...body };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
};

const deleteContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((el) => el._id === contactId);

  if (contactIdx === -1) {
    return null;
  }

  const [result] = contacts.splice(contactIdx, 1);
  console.log(result);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return result;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((el) => el._id === contactId);

  if (contactIdx === -1) {
    return null;
  }

  const prevContact = contacts[contactIdx];
  const updatedContact = (contacts[contactIdx] = { ...prevContact, ...body });

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  deleteContactById,
  addContact,
  updateContact,
};
