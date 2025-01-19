const Disaster = require('../models/Disaster'); // Adjust the path if necessary

const getDisasters = async (req, res) => {
  try {
    const disasters = await Disaster.find();
    res.json(disasters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDisasters,
};