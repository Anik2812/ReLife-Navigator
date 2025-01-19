const mongoose = require('mongoose');

const disasterSchema = new mongoose.Schema({
  category: String,
  preparation: [String],
  response: [String],
  recovery: [String],
});

module.exports = mongoose.model('Disaster', disasterSchema);