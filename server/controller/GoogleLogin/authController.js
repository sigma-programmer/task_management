// const jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const User = require('../../model/User'); // Adjust the path as necessary
const crypto = require('crypto');
const LoginDetails = require('../../model/LoginDetails');
// Handle Google login and token generation
const googleLogin = async (req, res) => {
  const {googleId,email, picture ,name ,ipAddress,deviceInfo} = req.body;

  try {

    

     // Check if the email is already registered and verified
     // Check if the email is already registered and verified
     const existingUser = await User.findOne({ email });
     if (existingUser && !existingUser.isGoogleLogin) {
       return res.status(400).json({ message: 'You are already registered and login with email password' });
     }
 
    // Decode and verify the token
    // const decoded = jwtDecode(token);
   // Create a new user if they don't exist
   const uniqueToken = crypto.randomBytes(15).toString('hex'); // Generate a unique token

    // Create or update the user in the database
    let user = await User.findOne({ googleId: googleId });

    if (!user) {
      user = new User({
        RecordId: uniqueToken,  // Set RecordId as the unique token
        uniqueToken,   
        googleId: googleId,
        name: name,
        email: email,
        picture: picture,
        isVerified: true,
        isGoogleLogin: true,
        role: 'Organisation',
      });
      await user.save();
    }


      // Generate a JWT token for the user
      const newToken = jwt.sign({ userId: user._id, email:user.email, role: user.role }, process.env.KEY, {
        expiresIn: "100d", // Set the token expiration time as needed
      });
    // // Generate a new token (if needed)
    // const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
 // Save login details
 const loginDetail = {
    token:newToken, // Store the JWT token here
    loginTimestamp: new Date(),
    loginIpAddress:ipAddress,
    loginDeviceDetails: deviceInfo

  };

  try {
    // Find the existing LoginDetails document for the user
    const loggedInUser = await LoginDetails.findOne({ userId: user._id });

    if (loggedInUser) {
      // Push the new login detail into the existing array
      loggedInUser.loginDetails.push(loginDetail);
      await loggedInUser.save();
    } else {
      // Create a new document if it doesn't exist
      const loggedInUserDetails = new LoginDetails({
        userId: user._id,
        loginDetails: [loginDetail], // Initialize the array with the first login detail
      });
      await loggedInUserDetails.save();
    }
  } catch (saveError) {
    logger.error('Error saving userDetails:', saveError);
    return res.status(500).json({ error: "An error occurred while logging in" });
  }



  // Respond with JWT token
  res.status(200).json({ message: 'Account Verified',  token: newToken,UserId: user._id, success: true });
   

  } catch (error) {
    console.error('Error handling Google login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  googleLogin,
};
