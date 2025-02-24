const express = require("express");
const multer = require("multer");
const { saveLogo } = require("../controller/logoController");

const router = express.Router();

// Multer setup for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post("/save-logo", upload.single("file"), saveLogo);

module.exports = router;
