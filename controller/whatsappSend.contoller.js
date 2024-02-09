const axios = require("axios");
require('dotenv').config();

const token=process.env.TOKEN;

exports.sendWhatsAppMessage  = (phon_no_id,from,text) => {
    axios({
      method: "POST",
      url: "https://graph.facebook.com/v13.0/"+phon_no_id+"/messages?access_token="+token,
      data: {
        messaging_product: "whatsapp",
        to: from,
        text: {
          body: text,
        },
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

