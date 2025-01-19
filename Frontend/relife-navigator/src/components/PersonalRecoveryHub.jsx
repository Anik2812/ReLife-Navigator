import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import TaskCard from './TaskCard';
import { jsPDF } from 'jspdf';

const initialTasks = [
  { id: 1, title: 'Task 1', description: 'Description for task 1', completed: false },
  { id: 2, title: 'Task 2', description: 'Description for task 2', completed: false },
  { id: 3, title: 'Task 3', description: 'Description for task 3', completed: false },
];

const PersonalRecoveryHub = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleToggle = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('Your Custom Action Plan', 10, 10);
    tasks.forEach((task, index) => {
      doc.text(`${index + 1}. ${task.title} - ${task.description} - ${task.completed ? 'Completed' : 'Incomplete'}`, 10, 20 + (index * 10));
    });
    doc.save('action-plan.pdf');
  };

  const progress = (tasks.filter(task => task.completed).length / tasks.length) * 100;

  return (
    <div className="personal-recovery-hub bg-gray-900 text-white min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Custom Action Plan</h1>
        <ProgressBar progress={progress} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onToggle={handleToggle} />
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Download Action Plan as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalRecoveryHub;