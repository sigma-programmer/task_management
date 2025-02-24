
// utils/emailSender.js
const nodemailer = require('nodemailer');
const generateEmailTemplate = require('../emailTemplates/emailTemplate');
const resetPasswordTemp = require('../emailTemplates/resetTemplate');

const sendBulkEmails = async (emails, url, subject, otp = null) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Choose the email template based on the subject
  const emailContent =
    subject === 'Password Reset' && otp ? resetPasswordTemp(url, otp) : generateEmailTemplate(url);

  const mailOptions = {
    from: `Intaskr <${process.env.EMAIL_USER}>`,
    to: emails,
    subject: subject,
    html: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    throw new Error('Failed to send emails');
  }
};

module.exports = sendBulkEmails;




// const sendBulkEmails = async (emails, url, subject) => {
//     // Create the transporter
//     const transporter = nodemailer.createTransport({
//         service: process.env.EMAIL_SERVICE_PROVIDER, // Your email provider's service
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     });

//     // Create the email template
//     const emailContent = generateEmailTemplate(url);

//     // Define the mail options
//     const mailOptions = {
//         from: `Intaskr <${process.env.EMAIL_USER}>`,
//         to: emails, // Emails can be a comma-separated string or an array
//         subject: subject, // Ensure the subject is passed correctly
//         html: emailContent,
//     };

//     try {
//         // Send the email
//         await transporter.sendMail(mailOptions);
//         console.log('Emails sent successfully');
//     } catch (error) {
//         console.error('Error sending emails:', error);
//         throw new Error('Failed to send emails');
//     }
// };

// module.exports = sendBulkEmails;
