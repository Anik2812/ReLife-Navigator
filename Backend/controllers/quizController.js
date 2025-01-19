const Question = require('../models/Question');

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.submitAnswers = async (req, res) => {
  const { answers } = req.body;

  try {
    const questions = await Question.find();
    let score = 0;

    questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += 1;
      }
    });

    res.json({ score });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};