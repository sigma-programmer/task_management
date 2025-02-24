const Event = require('../model/MeetingCalender/eventModel');
const { sendNotification } = require('../services/notificationService');


const scheduleMeeting = async (req, res) => {
    const { OrgId, title, start, end, link, emails } = req.body;
    const io = req.app.get('io');  // Get io from the app instance

    try {
        let event;

        if (OrgId) {
            // Find existing organizer
            event = await Event.findOne({ OrgId });
        }

        if (!event) {
            // Create new organizer and event if OrgId is not provided or doesn't exist
            event = new Event({ OrgId, MeetingDetails: [] });
        }

        const meeting = { title, start: new Date(start), end: new Date(end), link, emails };
        event.MeetingDetails.push(meeting);

        // Save event
        await event.save();

        // Schedule notifications for each email in the meeting
        emails.forEach((email) => {
            // sendNotification(OrgId, meeting, email);
            sendNotification(OrgId, meeting, email, io);  // Pass io

        });

        res.status(201).json({
            success: true,
            message: 'Meeting scheduled successfully!',
            OrgId: event.OrgId,
            event,
        });
    } catch (error) {
        console.error('Error scheduling meeting:', error);
        res.status(500).json({ success: false, message: 'Failed to schedule meeting.' });
    }
};

module.exports = { scheduleMeeting };





// const scheduleMeeting = async (req, res, io) => {
//     const { OrgId, title, start, end, link, emails } = req.body;

//     try {
//         let event;

//         if (OrgId) {
//             // Find existing organizer
//             event = await Event.findOne({ OrgId });
//         }

//         if (!event) {
//             // Create new organizer and event if OrgId is not provided or doesn't exist
//             event = new Event({ OrgId, MeetingDetails: [] });
//         }

//         const meeting = { title, start: new Date(start), end: new Date(end), link, emails };
//         event.MeetingDetails.push(meeting);

//         // Save event
//         await event.save();

//         // Schedule notifications for each email in the meeting
//         emails.forEach((email) => {
//             sendNotification(io, OrgId, meeting, email);
//         });

//         res.status(201).json({
//             success: true,
//             message: 'Meeting scheduled successfully!',
//             OrgId: event.OrgId,
//             event,
//         });
//     } catch (error) {
//         console.error('Error scheduling meeting:', error);
//         res.status(500).json({ success: false, message: 'Failed to schedule meeting.' });
//     }
// };

