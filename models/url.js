const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortID: String,
  redirectURL: String,
  shortURL: String,
  date: { type: String, default: Date.now }
});

module.exports = mongoose.model('Url', urlSchema);
