// utils/generate.js
const crypto = require('crypto');

// Generate a random 25-character RecordId
exports.generateRecordId = () => {
  return crypto.randomBytes(12).toString('hex'); // 24 characters + 1 extra to make it 25
};

// Generate a random 50-character uniqueToken
exports.generateUniqueToken = () => {
  return crypto.randomBytes(25).toString('hex'); // 50 characters
};

// Generate an 8-character OTP
exports.generateOtp = () => {
  return crypto.randomBytes(4).toString('hex'); // 8 characters
};
