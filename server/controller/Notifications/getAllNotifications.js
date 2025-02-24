const OrganizationNotifications = require('../../model/Notifications/Notifications'); // Adjust the path to your model

// Controller to get notifications for a specific OrgId
const getNotificationsByOrgId = async (req, res) => {
    const { orgId } = req.params;
    console.log("[[[[[[[[[[[[[[[[[[[[")
    console.log(orgId)
    try {
        // Find organization by OrgId
        const org = await OrganizationNotifications.findOne({ OrgId: orgId });
        if (!org) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        // Update isLoaded to true for fetched notifications
        org.notifications.forEach((notif) => {
            notif.isLoaded = true;
        });

        // Save updated notifications to the database
        await org.save();

        // Respond with notifications
        res.status(200).json(org.notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};


// Mark a notification as read
const markNotificationAsRead = async (req, res) => {
    const { orgId } = req.params;
    const { id } = req.body; // Notification ID to update
console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")
console.log(orgId)
console.log(id)
console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")
    try {
        // Find the organization
        const org = await OrganizationNotifications.findOne({ OrgId: orgId });
        if (!org) return res.status(404).json({ message: 'Organization not found' });

        // Find the specific notification and update isRead
        const notification = org.notifications.find((notif) => notif._id.toString() === id);
        if (!notification) return res.status(404).json({ message: 'Notification not found' });

        notification.isRead = true; // Mark as read
        await org.save();

        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error });
    }
};
module.exports = {
    getNotificationsByOrgId,
    markNotificationAsRead,

};
