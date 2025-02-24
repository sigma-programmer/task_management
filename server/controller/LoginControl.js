// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const LoginDetails = require('../model/LoginDetails');
// Handle user sign-in
exports.signIn = async (req, res) => {
  try {
    const { email, password,ipAddress,deviceInfo } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


  // Check if the user is active
  if (!user.isVerified) {
    return res.status(403).json({ message: 'Your account is inactive. Please contact support.' });
  }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate and send a JWT token for authentication
    



// ----------logindetails data save-------------


 const token = jwt.sign({ userId: user._id, email:user.email, role: user.role }, process.env.KEY, {
  expiresIn: "100d", // Set the token expiration time as needed
});


 // Save login details to the LoginDetails collection
 const existingLoginDetails = await LoginDetails.findOne({ userId: user._id });

 if (existingLoginDetails) {
   // User already exists, push the new login details
   existingLoginDetails.loginDetails.push({
     token,
     loginTimestamp: new Date(),
     loginIpAddress:ipAddress,
     loginDeviceDetails: deviceInfo
     // ipAddress,
     // Add other fields as needed (e.g., timestamp)
   });


 

   await existingLoginDetails.save();
 } else {
   // User does not exist, create a new entry
   const loginDetails = new LoginDetails({
     userId: user._id,
     loginDetails: [{
      token, // Store the JWT token here
      loginTimestamp: new Date(),
      loginIpAddress:ipAddress,
      loginDeviceDetails: deviceInfo
     }],
   });

   await loginDetails.save();
 }

// ---------------------------------





    res.status(200).json({ message: 'Sign in successful', token,UserId: user._id, success: true  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
