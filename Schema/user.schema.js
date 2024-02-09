const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phonenumber: {
    type: String,
    unique:true
  },
  conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;