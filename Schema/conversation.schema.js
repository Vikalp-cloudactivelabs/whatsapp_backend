const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    message: String,
    response: String,
    timestamp: { type: Date, default: Date.now }
  });
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;