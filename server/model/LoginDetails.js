

const mongoose = require('mongoose');

const LoginDetailSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  loginIpAddress: {
    type: String,
    // required: true
  },
  loginDeviceDetails: {
    type: Object,
    default: {}
  },
  // loginGeoLocation: {
  //   type: String,
  //   default: null
  // },
  loginTimestamp: {
    type: Date,
    default: null
  },

  
  logoutTimestamp: {
    type: Date,
    default: null
  },
  logoutIpAddress: {
    type: String,
    default: null
  },
  // logoutGeoLocation: {
  //   type: String,
  //   default: null
  // }
}, { timestamps: true });

const LoginDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  loginDetails: [LoginDetailSchema]
});

const LoginDetails = mongoose.model('LoginDetails', LoginDetailsSchema);
module.exports = LoginDetails;


