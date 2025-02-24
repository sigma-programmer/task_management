
const Waitlist = require('../model/waitlistModel');

exports.createWaitlistEntry = async (req, res) => {
  try {
    // Check if an entry with the same email already exists
    const existingEntry = await Waitlist.findOne({ email: req.body.email });
    if (existingEntry) {
      return res.status(409).json({ message: 'You are already in the waitlist.' });
    }

    // Create a new entry if no existing entry was found
    const newEntry = new Waitlist(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// const Waitlist = require('../model/waitlistModel');

// exports.createWaitlistEntry = async (req, res) => {
//   try {
//     // Check if an entry with the same email already exists
//     const existingEntry = await Waitlist.findOne({ email: req.body.email });
//     if (existingEntry) {
//       return res.status(409).json({ message: 'You are already in the waitlist.' });
//     }

//     // Create a new entry if no existing entry was found
//     const newEntry = new Waitlist(req.body);
//     await newEntry.save();
//     res.status(201).json(newEntry);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// // waitlistController.js
// const Waitlist = require('../model/waitlistModel');

// exports.createWaitlistEntry = async (req, res) => {
//   try {
//     const newEntry = new Waitlist(req.body);
//     console.log(newEntry.ipAddress)
//     await newEntry.save();
//     res.status(201).json(newEntry);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
