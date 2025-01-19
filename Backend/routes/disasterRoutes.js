const express = require('express');
const { getDisasters } = require('../controllers/disasterController');
const router = express.Router();

router.get('/disasters', getDisasters);

module.exports = router;