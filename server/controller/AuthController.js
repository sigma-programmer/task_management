const { sendMail } = require('../utils/mailService');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const LoginDetails = require('../model/LoginDetails');
const logger = require('../utils/logger'); // Adjust the path as necessary

const OTP = require('../model/otp');
const User = require('../model/User');
const jwt = require('jsonwebtoken');






// Function to send OTP by email
async function sendOTPByEmail(email, otp) {
  const subject = 'Verification OTP for Registration';
  const text = `Your OTP for registration is ${otp}. Please use this OTP to verify your email address.`;
  const html = `<p>Your OTP for registration is <strong>${otp}</strong>. Please use this OTP to verify your email address.</p>`;

  return await sendMail([email], subject, text, html);
}





exports.sendOtp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email is already registered and verified
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: 'Email is already registered and verified.' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit number
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Check if OTP entry for email already exists
    const existingOtpEntry = await OTP.findOne({ email });

    if (existingOtpEntry) {
      // Update the existing OTP and password
      existingOtpEntry.otp = hashedOtp;
      existingOtpEntry.password = password; // Hash the new password
      await existingOtpEntry.save();
    } else {
      // Create a new OTP entry
      await OTP.create({
        email,
        password: password, // Hash the password before saving
        otp: hashedOtp,
      });
    }

    // Send OTP to user's email
    const isEmailSent = await sendOTPByEmail(email, otp);

    // if (!isEmailSent) {
    //   return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    // }
// if(isEmailSent){

  // res.status(200).json({ message: 'OTP sent successfully.' });
// }
res.status(200).json({ message: 'OTP sent successfully.', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error generating OTP' });
  }
};



exports.verifyOtp = async (req, res) => {
  const { email, otp ,ipAddress,deviceInfo} = req.body;

  try {
    // Find the OTP record for the given email
    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP or email' });
    }

    // Verify the provided OTP with the hashed OTP in the database
    const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

 

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(otpRecord.password, 12);

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Update the existing user if they are not verified
      user.isVerified = true;
      user.password = hashedPassword; // Use the password from OTP entry (already hashed)
      await user.save();
    } else {
      // Create a new user if they don't exist
      const uniqueToken = crypto.randomBytes(15).toString('hex'); // Generate a unique token

      user = new User({
        RecordId: uniqueToken,  // Set RecordId as the unique token
        uniqueToken,            // Save the generated token
        email,
        password: hashedPassword, // Save hashed password from OTP
        isVerified: true,
        role: 'Organisation',   // Default role if not provided
      });

      await user.save();
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id, email, role: user.role }, process.env.KEY, {
      expiresIn: "100d", // Set the token expiration time as needed
    });

    // Save login details
    const loginDetail = {
      token, // Store the JWT token here
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

    // Delete OTP record after successful verification
    await OTP.deleteOne({ email });

    // Respond with JWT token
    res.status(200).json({ message: 'OTP verified successfully', token,UserId: user._id, success: true });
   
  } catch (error) {
    logger.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP', error });
  }
};

// // Verify OTP function
// exports.verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;
// // console.log(email)
//   try {
//     // Find the OTP record for the given email
//     const otpRecord = await OTP.findOne({ email });

//     if (!otpRecord) {
//       return res.status(400).json({ message: 'Invalid OTP or email' });
//     }

//     // Verify the provided OTP with the hashed OTP in the database
//     const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
//     if (!isOtpValid) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }


// let passwordOld=otpRecord.password;
//     // Check if the user already exists
//     let user = await User.findOne({ email });
    
//   // //  // Hash the password before saving it to the database
//   const hashedPassword = await bcrypt.hash(passwordOld, 12);

  
//     if (user) {
//       // Update the existing user if they are not verified
//       user.isVerified = true;
//       user.password = hashedPassword; // Use the password from OTP entry (already hashed)
//       await user.save();
//     } else {
//       // Create a new user if they don't exist
//       const uniqueToken = crypto.randomBytes(15).toString('hex'); // Generate a unique token

//       user = new User({
//         RecordId: uniqueToken,  // Set RecordId as the unique token
//         uniqueToken,            // Save the generated token
//         email,
//         password:hashedPassword, // Save hashed password from OTP
//         isVerified: true,
//         role: 'Organisation',   // Default role if not provided
//       });

//       await user.save();
//     }

 
 
//   // Generate a JWT token for the user
//   const token = jwt.sign({ userId: user._id, email, role: user.role }, process.env.KEY, {
//     expiresIn: "100d", // Set the token expiration time as needed
//   });






// // ---------------------save in login details-----------

// const loginDetail = {
//   token: token, // Store the JWT token here
// };

// try {
//   // Find the existing LoggedInUserDetails document for the user
//   const loggedInUser = await LoginDetails.findOne({ userId: user._id });

//   if (loggedInUser) {
//     // Push the new login detail into the existing array
//     loggedInUser.loginDetails.push(loginDetail);
//     await loggedInUser.save();
//   } else {
//     // Create a new document if it doesn't exist
//     const loggedInUserDetails = new LoginDetails({
//       userId: user._id,
//       loginDetails: [loginDetail], // Initialize the array with the first login detail
//     });
//     await loggedInUserDetails.save();
//   }

//   res.json({ message: "Login successful", token });
// } catch (saveError) {
//   console.error("Error saving userDetails:", saveError);
//   res.status(500).json({ error: "An error occurred while logging in" });
// }
// // ---------------------------------------------------

//    // Delete OTP record after successful verification
//    await OTP.deleteOne({ email });





//     // Respond with JWT token
//     res.status(200).json({ message: 'OTP verified successfully', token });
//   } catch (error) {
//     res.status(500).json({ message: 'Error verifying OTP', error });
//   }
// };



