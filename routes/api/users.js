const express = require("express");
const { userControllers } = require("../../controllers/index");
const { authenticate, uploadFile } = require("../../middlewares/index");
// ============================================================== //

const router = express.Router();

// User signup/registration
router.post("/signup", userControllers.userSignup);

// User login/signin
router.post("/login", userControllers.userLogin);

// User logout
router.post("/logout", authenticate, userControllers.userLogout);

// User get current
router.get("/current", authenticate, userControllers.getCurrentUser);

// Update/change user's avatar
// prettier-ignore
router.patch("/avatars", authenticate, uploadFile.single("avatar"), userControllers.updateAvatar);

module.exports = router;
