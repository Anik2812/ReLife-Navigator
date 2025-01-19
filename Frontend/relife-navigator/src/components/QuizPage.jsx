import React, { useState, useEffect } from 'react';
import QuizService from '../services/QuizService';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await QuizService.getQuestions();
      setQuestions(response.data);
      setAnswers(new Array(response.data.length).fill(''));
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await QuizService.submitAnswers(answers);
    setScore(response.data.score);
  };

  return (
    <div className="quiz-page">
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index}>
            <h3>{question.question}</h3>
            {question.options.map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {score !== null && <p>Your score: {score}</p>}
    </div>
  );
};

export default QuizPage;