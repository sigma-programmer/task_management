// controllers/contactController.js

const Contact = require('../model/Contact');

// Controller function to handle POST request to create a new contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, workEmail, companyName, companySize, countryRegion, anythingElse ,ipAddress } = req.body;

    // Create a new contact instance
    const newContact = new Contact({
      firstName,
      lastName,
      workEmail,
      companyName,
      companySize,
      countryRegion,
      anythingElse,
      ipAddress
    });

    // Save to MongoDB
    await newContact.save();

    res.status(201).json({ message: 'Contact created successfully', contact: newContact });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Failed to save contact' });
  }
};

module.exports = {
  createContact,
};
