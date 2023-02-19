const errorCreator = require("../helpers/errorCreator");
// ==========================================================//

// Checks if data introduced in req.body(eg.:name,email,phone) is already existing in the list.
// This func excludes object wich is being modified
const updateContactChecker = (contacts, reqBody, contactId) => {
  const contactIdx = contacts.findIndex((el) => el.id === contactId);
  contacts.splice(contactIdx, 1);
  const namesArr = contacts.map((el) => el.name.toLowerCase());
  const emailsArr = contacts.map((el) => el.email.toLowerCase());
  const numbersArr = contacts.map((el) => el.phone);

  if (namesArr.includes(reqBody.name?.toLowerCase())) {
    errorCreator(409, `Conflict. Name:"${reqBody.name}" already in the list`);
  }

  if (emailsArr.includes(reqBody.email?.toLowerCase())) {
    errorCreator(409, `Conflict. Email:"${reqBody.email}" already in the list`);
  }

  if (numbersArr.includes(reqBody.phone)) {
    errorCreator(409, `Conflict. Phone:"${reqBody.phone}" already in the list`);
  }
};

module.exports = updateContactChecker;
