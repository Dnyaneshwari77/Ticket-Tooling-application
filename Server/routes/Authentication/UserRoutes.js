const express = require("express");
const router = express.Router();
const { registerUser } = require("../../controllers/Authentication/User");
const { loginUser } = require("../../controllers/Authentication/User");

// Registration route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

module.exports = router;
