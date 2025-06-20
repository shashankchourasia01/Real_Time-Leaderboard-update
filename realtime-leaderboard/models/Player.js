const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  username: String,
  score: Number,
  region: String,
  gameMode: String,
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);
