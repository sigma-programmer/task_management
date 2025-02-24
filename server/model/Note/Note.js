const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    UserId: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
