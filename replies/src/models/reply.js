const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema();
ReplySchema.add({
  intent: String,
  message: String,
});

module.exports = {
  ReplySchema,
  Reply: mongoose.model('Reply', ReplySchema),
};
