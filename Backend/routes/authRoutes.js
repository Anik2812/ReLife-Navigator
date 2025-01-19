const express = require('express');
const { register, login, profile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');  // Import middleware

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);  // Protect profile route with middleware

module.exports = router;
