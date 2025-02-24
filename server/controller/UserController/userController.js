// controllers/userController.js
const User = require('../../model/User');

// Get user data by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update user data
exports.updateUser = async (req, res) => {
    const { name, nickName, gender, country, language, phoneNumber } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, nickName, gender, country, language, phoneNumber },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
