const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (name, email, password) => {
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  // Save the user to the database
  await user.save();

  return { message: 'User registered successfully' };
};

const login = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token };
};

const getProfile = async (token) => {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // Ensures cookies are included in cross-origin requests
    });
    return response.data;
  };
  

// const getProfile = async (userId) => {
//   // Find the user by ID and exclude the password field
//   const user = await User.findById(userId).select('-password');
//   if (!user) {
//     throw new Error('User not found');
//   }

//   return user;
// };

module.exports = {
  register,
  login,
  getProfile,
};
