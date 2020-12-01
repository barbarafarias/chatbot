const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema();
MessageSchema.add({
  intent: String,
  message: String,
});

module.exports = {
  MessageSchema,
  Message: mongoose.model('Message', MessageSchema),
};
