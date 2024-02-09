const express = require('express');
const router = express.Router();
const chatBotController = require('../controller/chatBot.controller');

router.post('/', chatBotController.chatBotSendMessage);

module.exports = router