const express = require('express');
const router = express.Router();
const whatsappController= require("../controller/whatsapp.controller");
router.get('/', whatsappController.whatsappGet);
router.post('/',whatsappController.whatsappPost );


module.exports = router;