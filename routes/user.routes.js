const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);

module.exports = router;