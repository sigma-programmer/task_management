const jwt = require('jsonwebtoken');
const User = require('../model/User');
const LoginDetails = require('../model/LoginDetails');

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.KEY);

    // Check if the user exists
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token, user not found' });
    }

    // Check if the token matches one of the tokens in the LoginDetails collection
    const loginDetails = await LoginDetails.findOne({
      userId: user._id,
      'loginDetails.token': token,
    });

    if (!loginDetails) {
      return res.status(401).json({ message: 'Token not found in login details' });
    }

    // Attach the user object and role to the request for further use
    req.user = {
      _id: user._id,
      role: user.role,
      uniqueToken: user.uniqueToken,
    };

    req.token = token;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
