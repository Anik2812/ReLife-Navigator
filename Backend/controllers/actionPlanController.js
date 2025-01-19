const ActionPlan = require('../models/ActionPlan');

exports.saveActionPlan = async (req, res) => {
  const { tasks, progress } = req.body;
  const userId = req.user.userId;

  try {
    let actionPlan = await ActionPlan.findOne({ userId });

    if (actionPlan) {
      actionPlan.tasks = tasks;
      actionPlan.progress = progress;
    } else {
      actionPlan = new ActionPlan({
        userId,
        tasks,
        progress,
      });
    }

    await actionPlan.save();
    res.status(200).json({ message: 'Action plan saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getActionPlan = async (req, res) => {
  const userId = req.user.userId;

  try {
    const actionPlan = await ActionPlan.findOne({ userId });

    if (!actionPlan) {
      return res.status(404).json({ message: 'Action plan not found' });
    }

    res.json(actionPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};