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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Disaster Preparedness Quiz</h2>
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="bg-gray-800 p-6 mb-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">{index + 1}. {question.question}</h3>
              <div className="space-y-2">
                {question.options.map((option, i) => (
                  <label key={i} className="block bg-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-600">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
        {score !== null && (
          <div className="mt-8 text-center">
            <p className="text-2xl">Your score: {score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;