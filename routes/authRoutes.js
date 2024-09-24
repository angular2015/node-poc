const express = require('express');
const authController = require('../controllers/authControllers');

const router = express.Router();

// Signup route (optional)
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authController.logout);

module.exports = router;
