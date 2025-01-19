import React from 'react';

const SummaryPage = ({ answers }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-8 text-center">Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {answers.map((answer, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Question {index + 1}</h3>
            <p className="text-lg">{answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryPage;