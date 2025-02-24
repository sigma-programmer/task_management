const express = require('express');
const multer = require('multer');
const { updateUser ,getUserData,removeUserLogo} = require('../../controller/MasterDataSetting/masterData');

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define route for updating user
router.post('/update-masterdatasetting', upload.single('picture'), updateUser);


router.get('/get-user-setting', getUserData);
router.post('/remove-master-logo', removeUserLogo);

module.exports = router;
