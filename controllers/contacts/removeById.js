const { contactSchemas } = require("../../models/index");
const { errorCreator } = require("../../helpers/index");
//  ===================================================//
const { Contact } = contactSchemas;

// Delete contact
const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndDelete({ _id: contactId });

    if (!result) {
      throw errorCreator(404, "Not found");
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
