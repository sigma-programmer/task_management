// models/Contact.js

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  workEmail: { type: String, required: true },
  companyName: { type: String },
  companySize: { type: String },
  countryRegion: { type: String, required: true },
  anythingElse: { type: String },
  ipAddress: { type: String },
  
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
