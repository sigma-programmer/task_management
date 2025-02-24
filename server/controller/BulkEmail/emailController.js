// controllers/emailController.js

const sendBulkEmails = require('../../utils/bulkEmailSender');

const sendEmails = async (req, res) => {
    const { emails, url,subject } = req.body; // Get emails and url from the request body

    // Log the received emails
    console.log('Emails to be sent:', emails);

    
    // Validate inputs
    if (!emails || !Array.isArray(emails) || emails.length === 0 || !url || !subject) {
        return res.status(400).send({ error: 'Emails (array), URL, and subject are required' });
    }

    try {
        await sendBulkEmails(emails, url, subject); // Call the sendBulkEmails function
        res.status(200).send({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error in sending emails:', error);
        res.status(500).send({ error: 'Failed to send emails' });
    }
};

module.exports = { sendEmails };
