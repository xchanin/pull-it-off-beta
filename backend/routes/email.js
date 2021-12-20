const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/email');

// router.post('', EmailController.Send);
router.post('', EmailController.SendGridMail);

module.exports = router;