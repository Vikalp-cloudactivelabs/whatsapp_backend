const User = require("../Schema/user.schema");
const Conversation= require("../Schema/conversation.schema")

exports.saveConversation=async(phoneNumberId, message, response)=> {
    const userData = await User.findOne({ phonenumber: phoneNumberId });
  
    if (userData) {
      // If the phone number already has a document, create a new conversation and save its reference
      const conversation = new Conversation({
        message: message,
        response: response
      });
  
      await conversation.save();
  
      userData.conversations.push(conversation._id);
      await userData.save();
    } else {
      // If the phone number doesn't have a document, create a new document with the initial conversation
      const newUser = new User({
        phonenumber: phoneNumberId,
        conversations: []  // initialize conversations as an empty array
      });
    
      const conversation = new Conversation({
        message: message,
        response: response
      });
    
      await conversation.save();
    
      newUser.conversations.push(conversation._id);
      await newUser.save();
    }
}
  