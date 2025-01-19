import React, { useState, useEffect } from 'react';
import QuizService from '../services/QuizService';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await QuizService.getQuestions();
        setQuestions(data);
        setAnswers(new Array(data.length).fill(''));
      } catch (error) {
        setMessage('Error fetching questions: ' + error.message);
      }
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
    try {
      const result = await QuizService.submitAnswers(answers);
      setResults(result);
    } catch (error) {
      setMessage('Error submitting answers: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Quiz</h2>
        {message && <p className="mt-4 text-center">{message}</p>}
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="mb-6">
              <p className="mb-2 text-lg font-semibold">{question.question}</p>
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="block">
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
              {results && (
                <p className={`mt-2 ${results.correctAnswers[index] ? 'text-green-500' : 'text-red-500'}`}>
                  {results.correctAnswers[index] ? 'Correct' : `Incorrect, the correct answer is: ${question.correctAnswer}`}
                </p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit Answers
          </button>
        </form>
        {results && (
          <p className="mt-4 text-center">
            You got {results.correctAnswers.filter(Boolean).length} out of {questions.length} correct!
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizPage;