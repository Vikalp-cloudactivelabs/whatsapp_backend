const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminSendMessage.controller');

router.post('/', adminController.adminSendMessage);

module.exports = router;