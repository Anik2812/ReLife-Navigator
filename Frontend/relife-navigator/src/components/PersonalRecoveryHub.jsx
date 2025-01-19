import React, { useState, useEffect } from 'react';
import DisasterService from '../services/disasterService';

const PersonalRecoveryHub = () => {
  const [disasters, setDisasters] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('preparation');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const data = await DisasterService.getDisasters();
        setDisasters(data);
      } catch (error) {
        console.error('Error fetching disasters:', error);
      }
    };

    fetchDisasters();
  }, []);

  const handleDisasterChange = (e) => {
    const disaster = disasters.find(d => d.category === e.target.value);
    setSelectedDisaster(disaster);
    setSelectedPhase('preparation');
    setTasks(disaster.preparation.map(task => ({ text: task, completed: false })));
  };

  const handlePhaseChange = (e) => {
    setSelectedPhase(e.target.value);
    setTasks(selectedDisaster[e.target.value].map(task => ({ text: task, completed: false })));
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Personal Recovery Hub</h2>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Select a Disaster:</label>
          <select
            value={selectedDisaster.category || ''}
            onChange={handleDisasterChange}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
          >
            <option value="">-- Select a Disaster --</option>
            {disasters.map((disaster) => (
              <option key={disaster.category} value={disaster.category}>{disaster.category}</option>
            ))}
          </select>
        </div>
        {selectedDisaster && (
          <div className="mb-6">
            <label className="block mb-2 text-lg font-semibold">Select a Phase:</label>
            <select
              value={selectedPhase}
              onChange={handlePhaseChange}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            >
              <option value="preparation">Preparation</option>
              <option value="response">Response</option>
              <option value="recovery">Recovery</option>
            </select>
          </div>
        )}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">{selectedPhase.charAt(0).toUpperCase() + selectedPhase.slice(1)} Tasks</h3>
          <ul className="list-disc list-inside">
            {tasks.map((task, index) => (
              <li key={index} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="mr-2"
                />
                <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PersonalRecoveryHub;