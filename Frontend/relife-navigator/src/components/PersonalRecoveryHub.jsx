import React, { useState, useEffect } from 'react';
import ActionPlanService from '../services/ActionPlanService';

const PersonalRecoveryHub = () => {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchActionPlan = async () => {
      const response = await ActionPlanService.getActionPlan();
      if (response.data) {
        setTasks(response.data.tasks);
        setProgress(response.data.progress);
      }
    };

    fetchActionPlan();
  }, []);

  const handleToggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    const newProgress = (newTasks.filter(task => task.completed).length / newTasks.length) * 100;
    setProgress(newProgress);
  };

  const handleSave = async () => {
    await ActionPlanService.saveActionPlan(tasks, progress);
  };

  return (
    <div className="personal-recovery-hub">
      <h1>Your Custom Action Plan</h1>
      <div>
        <progress value={progress} max="100"></progress>
        <span>{progress}%</span>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(index)}
            />
            <span>{task.title}</span>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>Save Action Plan</button>
    </div>
  );
};

export default PersonalRecoveryHub;