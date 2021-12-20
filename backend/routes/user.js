
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
/**
 * Register routes
 */

/**
 * When /api/user/signup is hit
 */
router.post('/signup', UserController.CreatUser);

router.post('/login', UserController.Login);

module.exports = router;