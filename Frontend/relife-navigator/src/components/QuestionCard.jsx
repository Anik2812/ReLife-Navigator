import React from 'react';

const QuestionCard = ({ question, options, onAnswer }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold mb-4">{question}</h2>
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;