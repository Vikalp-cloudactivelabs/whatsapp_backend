const { saveConversation } = require("./converstaionSave.controller");
const { sendWhatsAppMessage } = require("./whatsappSend.contoller");

exports.adminSendMessage= async(req,res)=>{
    const Userfrom= req.body.Userfrom;
    const message= req.body.message;
    try{
      sendWhatsAppMessage("219378761258509",Userfrom,message);
      await saveConversation(Userfrom, "", message);
      res.send("message sent sucessfull");
    }
    catch(e){
      console.log(e)
    }
  
  }