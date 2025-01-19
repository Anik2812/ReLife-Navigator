const mongoose = require('mongoose');

const actionPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tasks: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  progress: {
    type: Number,
    default: 0,
  },
});

const ActionPlan = mongoose.model('ActionPlan', actionPlanSchema);

module.exports = ActionPlan;