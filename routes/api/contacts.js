const express = require("express");
const { contactsControllers: ctrl } = require("../../controllers/index");
const { isValidId, authenticate } = require("../../middlewares/index");

// =========================================================== //

const router = express.Router();

// List all contacts
router.get("/", authenticate, ctrl.getAll);

// Get by id
router.get("/:contactId", authenticate, isValidId, ctrl.getById);

// Add new
router.post("/", authenticate, ctrl.addNew);

// Remove
router.delete("/:contactId", authenticate, isValidId, ctrl.removeById);

// Update
router.put("/:contactId", authenticate, isValidId, ctrl.updateById);

// Favorite handler
// prettier-ignore
router.patch( "/:contactId/favorite", authenticate, isValidId, ctrl.updateStatusContact
);

module.exports = router;
