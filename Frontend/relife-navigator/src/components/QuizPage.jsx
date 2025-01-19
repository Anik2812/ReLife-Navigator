import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import SummaryPage from './SummaryPage';

const questions = [
  {
    question: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow']
  },
  {
    question: 'What is your favorite animal?',
    options: ['Dog', 'Cat', 'Bird', 'Fish']
  },
  {
    question: 'What is your favorite food?',
    options: ['Pizza', 'Burger', 'Pasta', 'Salad']
  }
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-page bg-gray-900 text-white min-h-screen p-6">
      <div className="container mx-auto">
        <ProgressBar progress={progress} />
        {!showSummary ? (
          <QuestionCard
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            onAnswer={handleAnswer}
          />
        ) : (
          <SummaryPage answers={answers} />
        )}
      </div>
    </div>
  );
};

export default QuizPage;