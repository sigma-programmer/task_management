// models/Task.js
const mongoose = require('mongoose');

// Define the schema for TaskDetails
const TaskDetailsSchema = new mongoose.Schema({
    // icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endDate: { type: Date, required: true },
    endTime: { type: String, required: true },
    status: { type: String, default: 'Get Started' },
    notifyDuration: { type: String, default: '1 hour' },
    comments: { type: [String] }, // Array of comments
    tags:  { type: [String] },
    color: { type: String, default: '#ffffff' }, // Default color
});

// Main Task schema
const TaskSchema = new mongoose.Schema({
    UserId: { type: String, required: true },
    TaskDetails: [TaskDetailsSchema], // Array of TaskDetails
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
