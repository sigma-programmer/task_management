// utils/emailTemplate.js

const generateEmailTemplate = (url) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #333;">You've Been Shared a Note!</h2>
            <p style="font-size: 16px;">
                Hello,</p>
            <p style="font-size: 16px;">
                You have been shared a note. Click the link below to view it:
            </p>
            <p>
                <a href="${url}" style="display: inline-block; padding: 10px 15px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
                    View Note
                </a>
            </p>
            <p style="font-size: 14px; color: #777;">
                If you have any questions, feel free to reach out.
            </p>
            <p style="font-size: 14px; color: #777;">Best Regards,<br>Your Team</p>
        </div>
    `;
};

module.exports = generateEmailTemplate;
