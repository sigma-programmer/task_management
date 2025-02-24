

const Event = require('../../model/MeetingCalender/eventModel');
// const { sendMail } = require('../../utils/mailService');
const User = require('../../model/User');
const { sendNotification } = require('../../services/notificationService');
const nodemailer = require('nodemailer');

// Save event to database and send email

// Function to format date and time
const formatDateTime = (dateString) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};




const createTransporter = async (OrgId) => {
  try {
      const orgUser = await User.findById(OrgId); // Find the user by their OrgId

      // console.log(orgUser)
      if (orgUser && orgUser.masterEmail && orgUser.masterEmailAppPassword) {
          // Use organization's master email credentials
          return nodemailer.createTransport({
              service: process.env.EMAIL_SERVICE_PROVIDER,
              auth: {
                  user: orgUser.masterEmail,
                  pass: orgUser.masterEmailAppPassword
              }
          });
      } else {
          // Fallback to environment variables
          return nodemailer.createTransport({
              service: process.env.EMAIL_SERVICE_PROVIDER,
              auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASS
              }
          });
      }
  } catch (error) {
      console.error('Error creating transporter:', error);
      throw error;
  }
};

const saveEventAndSendEmail = async (req, res) => {
  const { UserId, title, start, end, link, emails } = req.body;
  const io = req.app.get('io');  // Get io from the app instance

  try {
    // Find the user by UserId (OrgId)
    const user = await User.findById(UserId);
    if (!user) return res.status(404).send('User not found.');

    // Find the event by OrgId (if it exists) or create a new event entry
    let event = await Event.findOne({ OrgId: UserId });
    if (!event) {
      // Create a new event document if it doesn't exist for this OrgId
      event = new Event({ OrgId: UserId, MeetingDetails: [] });
    }
    const meeting = { title, start: new Date(start), end: new Date(end), link, emails };
    event.MeetingDetails.push(meeting);

    // Push the new event into the MeetingDetails array
    // event.MeetingDetails.push({ title, start, end, link, emails });

    // Save the event
    await event.save();




        // Schedule notifications for each email in the meeting
        emails.forEach((email) => {
          // sendNotification(OrgId, meeting, email);
          sendNotification(UserId, meeting, email, io);  // Pass io

      });



    // Prepare and send the email
    const formattedStart = formatDateTime(start);
    const formattedEnd = formatDateTime(end);

    // Prepare and send the email
    const subject = `Meeting: ${title}`;

const text="";




html=`
<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                font-size: 16px;
                color: #555;
                line-height: 1.5;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background-color: #4CAF50;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>You have a meeting scheduled: "${title}"</h1>
            <p>Hi,</p>
            <p>This is a friendly tell about your meeting titled <strong>"${meeting.title}"</strong>, scheduled to start at <strong>${formattedStart}</strong>.</p>
            <p>Click the button below to join the meeting:</p>
            <a href="${link}" class="btn">Join Meeting</a>
            
        </div>
    </body>
</html>
`;


    // Send email using mailService to all provided emails
    // await sendMail(emails, subject, text,html);

        // Send emails using the dynamically created transporter
        const transporter = await createTransporter(UserId);
        for (const email of emails) {
          await transporter.sendMail({
            from: `Meeting Scheduler <${process.env.EMAIL_USER}>`,
            to: email,
            subject,
            html,
          });
        }
    
        res.status(200).send('Event saved and emails sent successfully.');
    

    // res.status(200).send('Event saved and email sent');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to save event or send email.');
  }
};
const getEvents = async (req, res) => {
  const { OrgId } = req.params; // Extract OrgId from URL parameters
  console.log(OrgId);

  try {
    // Find events by OrgId (UserId)
    const event = await Event.findOne({ OrgId }).populate('OrgId');

    if (!event) {
      return res.status(404).send('No events found for this OrgId.');
    }

    // Reverse sort the MeetingDetails by the start date
    const sortedMeetingDetails = event.MeetingDetails.sort((a, b) => {
      const dateA = new Date(a.start);
      const dateB = new Date(b.start);
      return dateB - dateA; // Descending order
    });

    // Return the sorted MeetingDetails
    res.status(200).json(sortedMeetingDetails);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Failed to retrieve events.');
  }
};



const updateEvent = async (req, res) => {
  try {
    const { UserId, title, start, end, link, emails } = req.body;

    // Find and update the event
    const event = await Event.findOneAndUpdate(
      { OrgId: UserId, 'MeetingDetails._id': req.params.id },
      {
        $set: {
          'MeetingDetails.$.title': title,
          'MeetingDetails.$.start': start,
          'MeetingDetails.$.end': end,
          'MeetingDetails.$.link': link,
          'MeetingDetails.$.emails': emails,
        },
      },
      { new: true }
    );

    if (!event) return res.status(404).send('Event not found.');

    // Prepare email content
    const formattedStart = formatDateTime(start);
    const formattedEnd = formatDateTime(end);
    const subject = `Updated Meeting: ${title}`;
    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              font-size: 16px;
              color: #555;
              line-height: 1.5;
            }
            .btn {
              padding: 10px 20px;
              background-color: #4CAF50;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Meeting Updated: "${title}"</h1>
            <p>Hi,</p>
            <p>The details of your meeting titled <strong>"${title}"</strong> have been updated. The meeting is now scheduled to start at <strong>${formattedStart}</strong> and end at <strong>${formattedEnd}</strong>.</p>
            <p>Click the button below to join the updated meeting:</p>
            <a href="${link}" class="btn">Join Meeting</a>
          </div>
        </body>
      </html>
    `;

    // Send updated details to all emails
    const transporter = await createTransporter(UserId);
    for (const email of emails) {
      await transporter.sendMail({
        from: `Meeting Scheduler <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html,
      });
    }

    res.status(200).json({ message: 'Event updated and emails sent successfully.', event });
  } catch (error) {
    console.error('Error updating event or sending emails:', error);
    res.status(500).send('Failed to update event and send emails.');
  }
};


// const getEvents = async (req, res) => {
//   const { OrgId } = req.params; // Extract OrgId from URL parameters
// console.log(OrgId)
//   try {
//     // Find events by OrgId (UserId)
//     const event = await Event.findOne({ OrgId }).populate('OrgId');

//     if (!event) {
//       return res.status(404).send('No events found for this OrgId.');
//     }

//     // Return only the MeetingDetails for this OrgId
//     res.status(200).json(event.MeetingDetails);
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     res.status(500).send('Failed to retrieve events.');
//   }
// };
// Update event
// const updateEvent = async (req, res) => {
//   try {
//     const { UserId, title, start, end, link, emails } = req.body;

//     // Find the event for the given OrgId
//     const event = await Event.findOneAndUpdate(
//       { OrgId: UserId, 'MeetingDetails._id': req.params.id },
//       {
//         $set: {
//           'MeetingDetails.$.title': title,
//           'MeetingDetails.$.start': start,
//           'MeetingDetails.$.end': end,
//           'MeetingDetails.$.link': link,
//           'MeetingDetails.$.emails': emails,
//         },
//       },
//       { new: true }
//     );

//     if (!event) return res.status(404).send('Event not found.');
//     res.status(200).json(event);
//   } catch (error) {
//     res.status(500).send('Failed to update event.');
//   }
// };
const deleteEvent = async (req, res) => {
  const { id } = req.params; // Event ID to delete
  const { UserId } = req.body; // OrgId from the request body

  try {
    // Find the event by OrgId and remove the meeting detail with the specified id
    const event = await Event.findOneAndUpdate(
      { OrgId: UserId }, // Find by OrgId
      { $pull: { MeetingDetails: { _id: id } } }, // Pull the event with matching id
      { new: true }
    );

    if (!event) return res.status(404).send('Event not found.');

    res.status(200).send('Event deleted successfully.');
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).send('Failed to delete event.');
  }
};

module.exports = {
  saveEventAndSendEmail,
  getEvents,
  updateEvent,
  deleteEvent,
};




// const Event = require('../../model/MeetingCalender/eventModel');
// const { sendMail } = require('../../utils/mailService');
// const User = require('../../model/User');
// // Save event to database and send email
// const saveEventAndSendEmail = async (req, res) => {
//   const {UserId, title, start, end, link, emails } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ _id:UserId });
// console.log(user)

//   const newEvent = new Event({ title, start, end, link, emails });

//   try {
//     await newEvent.save();

//     // Send email using mailService
//     const subject = `Meeting: ${title}`;
//     const text = `You have a meeting scheduled:

// Title: ${title}
// Start: ${start}
// End: ${end}
// Link: ${link}`;

//     // Sending email to all provided emails
//     await sendMail(emails, subject, text);

//     res.status(200).send('Event saved and email sent');
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Failed to save event or send email.');
//   }
// };

// // Retrieve events from the database
// const getEvents = async (req, res) => {
//   try {
//     const events = await Event.find();
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).send('Failed to retrieve events.');
//   }
// };

// // Update event
// const updateEvent = async (req, res) => {
//   try {
//     const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedEvent) return res.status(404).send('Event not found.');
//     res.status(200).json(updatedEvent);
//   } catch (error) {
//     res.status(500).send('Failed to update event.');
//   }
// };

// // Delete event
// const deleteEvent = async (req, res) => {
//   try {
//     const deletedEvent = await Event.findByIdAndDelete(req.params.id);
//     if (!deletedEvent) return res.status(404).send('Event not found.');
//     res.status(200).send('Event deleted successfully.');
//   } catch (error) {
//     res.status(500).send('Failed to delete event.');
//   }
// };

// module.exports = {
//   saveEventAndSendEmail,
//   getEvents,
//   updateEvent,
//   deleteEvent,
// };
