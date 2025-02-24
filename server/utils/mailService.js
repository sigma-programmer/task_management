// utils/mailService.js

const nodemailer = require('nodemailer');

const sendMail = async (to, subject, text, html) => {
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    // Use your SMTP details here
    // Example using Gmail SMTP
    service: process.env.EMAIL_SERVICE_PROVIDER,
    auth: {
      user:process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS // Your email password
    }
  });

  // Email message
  const mailOptions = {
    from:  `Intaskr <${ process.env.EMAIL_USER}>`,
    to: to, // Recipient email address
    subject: subject,
    text: text,
    html: html
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

module.exports = { sendMail };
