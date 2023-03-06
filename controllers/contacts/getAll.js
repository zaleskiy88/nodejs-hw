const { contactSchemas } = require("../../models/index");
// ============================================== //
const { Contact } = contactSchemas;

// Get all contacts
const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    // prettier-ignore
    const contacts = await Contact.find({ owner }, "-createdAt -updatedAt")
      .populate("owner", "_id email subscription");

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
