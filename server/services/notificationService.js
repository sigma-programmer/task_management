



const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const OrganizationNotifications = require('../model/Notifications/Notifications'); 
const User = require('../model/User'); // Import the User model

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

// Pass io as a parameter
const sendNotification = async (OrgId, meeting, email, io) => {
    const notificationTime = new Date(new Date(meeting.start).getTime() - 2 * 60 * 1000); // 2 minutes before

    schedule.scheduleJob(notificationTime, async () => {
        try {
            // Dynamically create a transporter
            const transporter = await createTransporter(OrgId);

            await transporter.sendMail({
                from: `Intaskr <${process.env.EMAIL_USER}>`, // You can replace this with a dynamic email as needed
                to: email,
                subject: `Reminder: ${meeting.title}`,
                html: `
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
                                <h1>Meeting Reminder: "${meeting.title}"</h1>
                                <p>Hi,</p>
                                <p>This is a friendly reminder about your meeting titled <strong>"${meeting.title}"</strong>, scheduled to start at <strong>${new Date(meeting.start).toLocaleString()}</strong>.</p>
                                <p>Click the button below to join the meeting:</p>
                                <a href="${meeting.link}" class="btn">Join Meeting</a>
                            
                            </div>
                        </body>
                    </html>
                `,
            });

            console.log(`Notification email sent to ${email}`);

            const notification = {
                email,
                isLoaded: false,
                isRead: false,
                type: "meeting",
                message: `Reminder for meeting: "${meeting.title}"`,
                timestamp: new Date(),
            };

            const org = await OrganizationNotifications.findOne({ OrgId });

            if (org) {
                org.notifications.push(notification);
                await org.save();
            } else {
                await OrganizationNotifications.create({
                    OrgId,
                    notifications: [notification],
                });
            }

            console.log(`Notification saved in database for OrgId: ${OrgId}`);

            if (io) {
                io.emit('notification', { OrgId, email, message: notification.message });
            } else {
                console.error('io is not initialized');
            }
        } catch (error) {
            console.error('Error sending or saving notification:', error);
        }
    });
};

module.exports = { sendNotification };



// const nodemailer = require('nodemailer');
// const schedule = require('node-schedule');
// const OrganizationNotifications = require('../model/Notifications/Notifications'); // Import the model





// const transporter = nodemailer.createTransport({
//     service: process.env.EMAIL_SERVICE_PROVIDER,
//     auth: {
//       user:process.env.EMAIL_USER, // Your email address
//       pass: process.env.EMAIL_PASS // Your email password
//     }
// });

// // Pass io as a parameter
// const sendNotification = async (OrgId, meeting, email, io) => {
//     const notificationTime = new Date(new Date(meeting.start).getTime() - 2 * 60 * 1000); // 2 minutes before

//     schedule.scheduleJob(notificationTime, async () => {
//         try {
        
//             await transporter.sendMail({
//                 from: `Intaskr <${process.env.EMAIL_USER}>`,
//                 to: email,
//                 subject: `Reminder: ${meeting.title}`,
//                 html: `
//                     <html>
//                         <head>
//                             <style>
//                                 body {
//                                     font-family: Arial, sans-serif;
//                                     margin: 0;
//                                     padding: 0;
//                                     background-color: #f4f4f4;
//                                 }
//                                 .container {
//                                     width: 100%;
//                                     max-width: 600px;
//                                     margin: 0 auto;
//                                     background-color: #ffffff;
//                                     padding: 20px;
//                                     border-radius: 8px;
//                                     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//                                 }
//                                 h1 {
//                                     color: #333;
//                                 }
//                                 p {
//                                     font-size: 16px;
//                                     color: #555;
//                                     line-height: 1.5;
//                                 }
//                                 .btn {
//                                     display: inline-block;
//                                     padding: 10px 20px;
//                                     margin-top: 20px;
//                                     background-color: #4CAF50;
//                                     color: #fff;
//                                     text-decoration: none;
//                                     border-radius: 5px;
//                                 }
//                                 .footer {
//                                     margin-top: 30px;
//                                     font-size: 12px;
//                                     color: #888;
//                                 }
//                             </style>
//                         </head>
//                         <body>
//                             <div class="container">
//                                 <h1>Meeting Reminder: "${meeting.title}"</h1>
//                                 <p>Hi,</p>
//                                 <p>This is a friendly reminder about your meeting titled <strong>"${meeting.title}"</strong>, scheduled to start at <strong>${new Date(meeting.start).toLocaleString()}</strong>.</p>
//                                 <p>Click the button below to join the meeting:</p>
//                                 <a href="${meeting.link}" class="btn">Join Meeting</a>
                            
//                             </div>
//                         </body>
//                     </html>
//                 `,
//             });
            

//             console.log(`Notification email sent to ${email}`);

//             // Create the notification object
//             const notification = {
//                 email,
//                 isLoaded: false,
//                 isRead: false,
//                 type:"meeting",
//                 message: `Reminder for meeting: "${meeting.title}"`,
//                 timestamp: new Date(),
//             };

//             // Save the notification to the database
//             const org = await OrganizationNotifications.findOne({ OrgId });

//             if (org) {
//                 // If organization exists, push the new notification
//                 org.notifications.push(notification);
//                 await org.save();
//             } else {
//                 // If organization doesn't exist, create a new entry
//                 await OrganizationNotifications.create({
//                     OrgId,
//                     notifications: [notification],
//                 });
//             }

//             console.log(`Notification saved in database for OrgId: ${OrgId}`);

//             // Emit the notification to the socket with the OrgId
//             if (io) {
//                 io.emit('notification', { OrgId, email, message: notification.message });
//             } else {
//                 console.error('io is not initialized');
//             }
//         } catch (error) {
//             console.error('Error sending or saving notification:', error);
//         }
//     });
// };

// module.exports = { sendNotification };



// const nodemailer = require('nodemailer');
// const schedule = require('node-schedule');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'intaskr@gmail.com',
//         pass: 'ylqu hwbq pzls wabs', // Replace with your email password or app password
//     },
// });

// // Pass io as a parameter
// const sendNotification = async (OrgId, meeting, email, io) => {
//     const notificationTime = new Date(new Date(meeting.start).getTime() - 2 * 60 * 1000); // 2 minutes before
//     schedule.scheduleJob(notificationTime, async () => {
//         try {
//             // Send email notification
//             await transporter.sendMail({
//                 from: 'intaskr@gmail.com',
//                 to: email,
//                 subject: `Reminder: ${meeting.title}`,
//                 text: `Hi, this is a reminder for your meeting: "${meeting.title}" starting at ${new Date(meeting.start).toLocaleString()}. Link: ${meeting.link}`,
//             });

//             console.log(`Notification email sent to ${email}`);

//             // Emit the notification to the socket with the OrgId
//             if (io) {
//                 io.emit('notification', { OrgId, email, message: `Reminder for meeting: "${meeting.title}"` });
//             } else {
//                 console.error('io is not initialized');
//             }
//         } catch (error) {
//             console.error('Error sending email:', error);
//         }
//     });
// };

// module.exports = { sendNotification };



