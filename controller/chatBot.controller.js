const { sendToDialogflow } = require("./dialogflow.controller");

exports.chatBotSendMessage=async(req, res) => {
    const body = req.body;
    try{
      const resultQuery= await sendToDialogflow(body.message,body.userId);
      res.send(resultQuery);  
  
    }catch(e){
      console.log(e)
      res.sendStatus(404);
    }
  }