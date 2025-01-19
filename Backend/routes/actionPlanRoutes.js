const express = require('express');
const { saveActionPlan, getActionPlan } = require('../controllers/actionPlanController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/action-plan', authMiddleware, saveActionPlan);
router.get('/action-plan', authMiddleware, getActionPlan);

module.exports = router;