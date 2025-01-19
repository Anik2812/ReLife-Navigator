const express = require('express');
const { getQuestions, submitAnswers } = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/submit', authMiddleware, submitAnswers);

module.exports = router;