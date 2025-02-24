// waitlistModel.js
const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: false,
  },
  ipAddress: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Waitlist', waitlistSchema);
