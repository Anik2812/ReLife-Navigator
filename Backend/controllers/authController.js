const authService = require('../services/AuthService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await authService.register(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user and set JWT token in cookies
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set token as a cookie
    res.cookie('token', token, {
      httpOnly: true, // The cookie is not accessible via JavaScript (for security).
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (requires HTTPS).
      sameSite: 'None', // Required for cross-origin cookie handling.
      maxAge: 60 * 60 * 1000, // Cookie expiration time (1 hour)
    });

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile using JWT token (with authentication middleware)
exports.profile = async (req, res) => {
  try {
    // Fetch user profile using the userId from the JWT token
    const user = await authService.getProfile(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
};
