const express = require("express");
const bodyParser= require("body-parser");
const cors= require("cors"); 
const config = require("./config/devKey");
const dialogflow= require("dialogflow");
const axios=require("axios");
require('dotenv').config();

const privateKey= config.googlePrivetKey;
const projectId= config.googleProjectId;
const sessionId= config.dialogFlowSessionID;

const credentials = {
  client_email:config.googleclientEmail,
  private_key:privateKey,
}

const sessionClient = new dialogflow.SessionsClient({projectId,credentials});

const app= express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const token=process.env.TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.get('/whatsapp', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
  console.log("token",res );
    if (mode && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
});

app.post("/whatsapp", async(req,res)=>{
  let body_param=req.body;

  console.log("body_param", body_param);

  if(body_param.object){
      console.log("inside body param");
      if(body_param.entry && 
          body_param.entry[0].changes && 
          body_param.entry[0].changes[0].value.messages && 
          body_param.entry[0].changes[0].value.messages[0]  
          ){
             let phon_no_id=body_param.entry[0].changes[0].value.metadata.phone_number_id;
             let from = body_param.entry[0].changes[0].value.messages[0].from; 
             let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

             console.log("phone number "+phon_no_id);
             console.log("from "+from);
             console.log("boady param "+msg_body);

             // Call Dialogflow to get a response
      const dialogflowResponse = await sendToDialogflow(msg_body, from);

      // Send the Dialogflow response back to the user
      sendWhatsAppMessage(phon_no_id,from,dialogflowResponse);

             res.sendStatus(200);
          }else{
              res.sendStatus(404);
          }

  }
});

async function sendToDialogflow(message, sessionId) {
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result.fulfillmentText;
  } catch (error) {
    console.error('Error sending message to Dialogflow:', error);
    return 'An error occurred while processing your request.';
  }
}

function sendWhatsAppMessage(phon_no_id,from,text) {
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
}


app.get("/demo",(req,res)=>{
    res.send("Hii, from server!")
});

app.listen(3001,async()=>{
    // await connect();
      console.log("listen on port:3001")
})