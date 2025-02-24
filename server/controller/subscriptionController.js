// controllers/subscriptionController.js
const Subscription = require('../model/subscriptionModel');

exports.subscribe = async (req, res) => {
  const { email, ipAddress } = req.body;

  if (!email || !ipAddress) {
    return res.status(400).json({ message: 'Email and IP address are required' });
  }

  try {
    // Check if the email is already subscribed
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: 'Email is already subscribed' });
    }

    // Create a new subscription
    const newSubscription = new Subscription({ email, ipAddress });
    await newSubscription.save();

    res.status(201).json({ message: 'Subscription successful' });
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
