const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const actionPlanRoutes = require('./routes/actionPlanRoutes');
const postRoutes = require('./routes/postRoutes');
const disasterRoutes = require('./routes/disasterRoutes');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend URL


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api', actionPlanRoutes);
app.use('/api', postRoutes);
app.use('/api', disasterRoutes);



// Root route
app.get('/', (req, res) => {
  res.send('Server running successfully for ReLife Navigator');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});