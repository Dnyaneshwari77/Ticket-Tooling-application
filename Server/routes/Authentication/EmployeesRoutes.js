const express = require('express');
const router = express.Router();
const { registerEmployee,loginEmployee } = require('../../controllers/Authentication/Employee');

// Employee Registration route
router.post('/register', registerEmployee);

// Employee Login route
router.post('/login', loginEmployee);

module.exports = router;
