// const Logo = require("../models/Logo");

// Save logo to database
exports.saveLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const fileBuffer = req.file.buffer.toString("base64");

    console.log(fileBuffer)
    // const newLogo = new Logo({ logoUrl: fileBuffer });
    // await newLogo.save();

    res.status(200).json({ message: "Logo saved successfully!" });
  } catch (error) {
    console.error("Error saving logo:", error);
    res.status(500).json({ message: "Failed to save logo." });
  }
};
