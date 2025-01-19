const config = require('../config');
const authService = require('../services/AuthService');
const User = require('../models/User'); // Assuming a User model exists
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Input validation (you can improve this further based on your requirements)
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Return the newly created user (excluding password)
    res.status(201).json({ name: newUser.name, email: newUser.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      config.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return the token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get user profile (authenticated route)
exports.profile = async (req, res) => {
  try {
    // Fetch the user profile using the userId from the request
    const user = await authService.getProfile(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};
