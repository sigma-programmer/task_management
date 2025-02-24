
const mongoose = require('mongoose');

// Define the roles allowed
const allowedRoles = ['Employee', 'Organisation', 'Superadmin'];

const UserSchema = new mongoose.Schema({
  RecordId: { type: String, required: true },
  uniqueToken: { type: String, required: true, unique: true },
  userName: { type: String },
  password: { type: String },
  isVerified: { type: Boolean, default: false },
  isGoogleLogin: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  picture: { type: String },
  googleId: { type: String },
  role: {
    type: String,
    enum: allowedRoles, // Restrict the role to predefined values
    default: 'Organisation'
  },
  masterEmail: { type: String },
  masterEmailAppPassword: { type: String },
  masterSiteLogo: { type: String },
  masterFullCompanyAddress: { type: String },
  companyGST: { type: String },
  meetingLink: { type: String },

  nickName: { type: String },
  gender: { type: String },
  country: { type: String },
  language: { type: String },
  phoneNumber: { type: String },

  OTP: { type: String }, // Field to store hashed OTP
  otpExpiresAt: { type: Date } 
});

// Middleware to check the "Superadmin" limit
UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.role === 'Superadmin') {
    const superadminCount = await mongoose.model('User').countDocuments({ role: 'Superadmin' });
    
    if (superadminCount >= 2) {
      // Prevent saving if there are already 2 Superadmin users
      const error = new Error('Cannot have more than 2 Superadmin users.');
      return next(error);
    }
  }

  next();
});

module.exports = mongoose.model('User', UserSchema);


// const mongoose = require('mongoose');

// // Define the roles allowed
// const allowedRoles = ['Employee', 'Organisation', 'Superadmin'];

// const UserSchema = new mongoose.Schema({
//   RecordId: { type: String, required: true },
//   uniqueToken: { type: String, required: true, unique: true },
//   userName: { type: String },
//   // password: { type: String, required: true },
//   password: { type: String },
//   isVerified: { type: Boolean, default: false },
//   isGoogleLogin: { type: Boolean, default: false },
//   email: { type: String, required: true, unique: true },
//   name: { type: String },
//   picture: { type: String },
//   googleId: { type: String },
//   role: {
//     type: String,
//     enum: allowedRoles, // Restrict the role to predefined values
//     default: 'Organisation'
//   },
// });

// // Middleware to check the "Superadmin" limit
// UserSchema.pre('save', async function (next) {
//   const user = this;

//   if (user.role === 'Superadmin') {
//     const superadminCount = await mongoose.model('User').countDocuments({ role: 'Superadmin' });
    
//     if (superadminCount >= 2) {
//       // Prevent saving if there are already 2 Superadmin users
//       const error = new Error('Cannot have more than 2 Superadmin users.');
//       return next(error);
//     }
//   }

//   next();
// });

// module.exports = mongoose.model('User', UserSchema);
