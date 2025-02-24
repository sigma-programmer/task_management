// emailTemplates/resetPasswordTemp.js
const resetPasswordTemp = (url, otp) => `
  <div>
    <h2>Password Reset Request</h2>
    <p>Your OTP for password reset is: <strong>${otp}</strong></p>
    <p>To reset your password, please click the link below:</p>
    <a href="${url}">Reset Password</a>
    <p>If you didn’t request this, please ignore this email.</p>
  </div>
`;

module.exports = resetPasswordTemp;
