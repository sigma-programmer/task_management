const User = require('../../model/User');

// Update user data controller
const updateUser = async (req, res) => {
    try {
        const { UserId, companyAddress, appPassword, email ,companyGST,meetingLink} = req.body;
        const user = await User.findById(  UserId );
console.log(meetingLink)
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Update picture if provided
        if (req.file) {
            const picture = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            user.masterSiteLogo = picture;
        }



        // Update other fields if provided
        if (companyAddress) user.masterFullCompanyAddress = companyAddress;
        if (appPassword) user.masterEmailAppPassword = appPassword;
        if (email) user.masterEmail = email;
        if (companyGST) user.companyGST = companyGST;
        if (meetingLink) user.meetingLink = meetingLink;



        // Save the updated user
        await user.save();
        res.status(200).json({ message: 'Data updated successfully!', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserData = async (req, res) => {
    try {
        const { UserId } = req.query; // Get UserId from query parameters
        const user = await User.findById(UserId );

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const removeUserLogo = async (req, res) => {
    try {
        const { UserId } = req.body;

        const user = await User.findById(UserId);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        user.masterSiteLogo = null; // Remove the logo from the database
        await user.save();

        res.status(200).json({ message: 'Image removed successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserData,
    updateUser,
    removeUserLogo
};
