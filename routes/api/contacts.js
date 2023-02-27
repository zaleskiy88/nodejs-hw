const express = require("express");
const ctrl = require("../../controllers/contacts");

// =========================================================== //

const router = express.Router();

// List all contacts
router.get("/", ctrl.getAll);

// Get by id
router.get("/:contactId", ctrl.getById);

// Add new
router.post("/", ctrl.addNew);

// Remove
router.delete("/:contactId", ctrl.removeById);

// Update
router.put("/:contactId", ctrl.updateById);

module.exports = router;
