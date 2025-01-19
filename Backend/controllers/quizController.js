const Question = require('../models/Question'); // Assuming you have a Question model

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const submitAnswers = async (req, res) => {
  const { answers } = req.body;
  try {
    const questions = await Question.find();
    let correctAnswers = [];
    answers.forEach((answer, index) => {
      correctAnswers[index] = answer === questions[index].correctAnswer;
    });
    res.json({ correctAnswers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuestions,
  submitAnswers,
};