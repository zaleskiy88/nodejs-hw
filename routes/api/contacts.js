const express = require("express");
const ctrl = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares/index");

// =========================================================== //

const router = express.Router();

// List all contacts
router.get("/", ctrl.getAll);

// Get by id
router.get("/:contactId", isValidId, ctrl.getById);

// Add new
router.post("/", ctrl.addNew);

// Remove
router.delete("/:contactId", isValidId, ctrl.removeById);

// Update
router.put("/:contactId", isValidId, ctrl.updateById);

// Favorite handler
router.patch("/:contactId/favorite", isValidId, ctrl.updateStatusContact);

module.exports = router;
