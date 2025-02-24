const mongoose = require('mongoose');

// Notification schema
const notificationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    isLoaded: { type: Boolean, default: false }, // Boolean to track if notification is loaded
    isRead: { type: Boolean, default: false }, // Boolean to track if notification is read
    type: { type: String, required: true}, // Boolean to track if notification is read
    message: { type: String, required: true }, // Notification message
    timestamp: { type: Date, default: Date.now }, // Timestamp of notification
});

// Organization schema
const organizationSchema = new mongoose.Schema({
    OrgId: { type: String, required: true, unique: true }, // Unique identifier for the organization
    notifications: [notificationSchema], // Array of notifications
});

// Organization model
const OrganizationNotifications = mongoose.model('Notifications', organizationSchema);

module.exports = OrganizationNotifications;
