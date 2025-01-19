const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Your React frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow the Authorization header
    credentials: true, // Allow cookies to be sent across origins
  }));

// Routes
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Server running successfully');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
