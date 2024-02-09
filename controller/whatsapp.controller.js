const {sendToDialogflow}= require("./dialogflow.controller");
const {saveConversation}= require("./converstaionSave.controller");
const {sendWhatsAppMessage}= require("./whatsappSend.contoller");
require('dotenv').config();
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

exports.whatsappGet=(req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
}

exports.whatsappPost=async(req,res)=>{
    let body_param=req.body;
    if(body_param.object){
      
        if(body_param.entry && 
            body_param.entry[0].changes && 
            body_param.entry[0].changes[0].value.messages && 
            body_param.entry[0].changes[0].value.messages[0]  
            ){
               let phon_no_id=body_param.entry[0].changes[0].value.metadata.phone_number_id;
               let from = body_param.entry[0].changes[0].value.messages[0].from; 
               let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
  
               // Call Dialogflow to get a response
        const dialogflowResponse = await sendToDialogflow(msg_body, from);
        await saveConversation(from, msg_body, dialogflowResponse)
        // Send the Dialogflow response back to the user
        sendWhatsAppMessage(phon_no_id,from,dialogflowResponse);
  
               res.sendStatus(200);
            }else{
                res.sendStatus(404);
            }
  
    }
  }