import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const TaskCard = ({ task, onToggle }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <div className="flex items-center mb-4">
        <FaCheckCircle className={`text-2xl ${task.completed ? 'text-green-500' : 'text-gray-500'}`} />
        <h3 className="text-2xl font-bold ml-4">{task.title}</h3>
      </div>
      <p className="mb-4">{task.description}</p>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="form-checkbox h-5 w-5 text-blue-500"
        />
        <span className="ml-2">Mark as complete</span>
      </label>
    </div>
  );
};

export default TaskCard;