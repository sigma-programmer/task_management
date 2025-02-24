const LoginDetails = require('../model/LoginDetails');

exports.logout = async (req, res) => {
  try {
    const { userId, token ,ipAddress} = req.body;

    const loginDetails = await LoginDetails.findOne({ userId });

    if (!loginDetails) {
      return res.status(400).json({ message: 'Login details not found' });
    }

    // Find the login detail with the matching token
    const detailIndex = loginDetails.loginDetails.findIndex(detail => detail.token === token);

    if (detailIndex === -1) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Update the logout timestamp and IP address
    loginDetails.loginDetails[detailIndex].logoutTimestamp = new Date();
    loginDetails.loginDetails[detailIndex].logoutIpAddress = ipAddress;

    await loginDetails.save();

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
