// controllers/userController.js
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../../model/User');
const sendBulkEmails = require('../../utils/bulkEmailSender');
const { generateResetUrl } = require('../../utils/urlGenerator');

// Generate a random 8-digit OTP
const generateOTP = () => Math.floor(10000000 + Math.random() * 90000000).toString();

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isVerified && !user.isGoogleLogin) {
      const otp = generateOTP();
      const hashedOTP = await bcrypt.hash(otp, 10);
      
      // Set OTP and expiration (5 minutes from now)
      user.OTP = hashedOTP;
      user.otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes in milliseconds
      await user.save();

      const resetUrl = generateResetUrl(user.uniqueToken);
      await sendBulkEmails(user.email, resetUrl, 'Password Reset', otp);

      res.status(200).json({ message: 'Password reset link sent! Check your email.' });
    } else {
      res.status(400).json({ message: 'Account is either not verified or uses Google Login' });
    }
  } catch (error) {
    console.error('Error in requestPasswordReset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
console.log(email,otp,newPassword)
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
 // Check if the user is verified
 if (!user.isVerified) {
  return res.status(403).json({ message: 'User account is not verified' });
}

    // Check if OTP has expired
    if (user.otpExpiresAt < Date.now()) {
      user.OTP = undefined; // Clear expired OTP
      user.otpExpiresAt = undefined;
      await user.save();
      return res.status(400).json({ message: 'OTP has expired' });
    }

    const isOTPCorrect = await bcrypt.compare(otp, user.OTP);
    if (!isOTPCorrect) return res.status(400).json({ message: 'Invalid OTP' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.OTP = undefined;
    user.otpExpiresAt = undefined; // Clear OTP and expiry after success
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
