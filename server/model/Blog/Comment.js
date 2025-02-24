const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  name: String,
  ipAddressofUser: String,
  email: String,
  content: String,
  replies: [{ email: String, content: String }]
});

module.exports = mongoose.model('Comment', CommentSchema);
