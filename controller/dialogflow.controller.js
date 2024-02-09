const dialogflow = require('dialogflow');
require('dotenv').config();
const config = require("../config/devKey");

const privateKey= config.googlePrivetKey;
const projectId= config.googleProjectId;
const sessionId= config.dialogFlowSessionID;

const credentials = {
  client_email:config.googleclientEmail,
  private_key:privateKey,
};

const sessionClient = new dialogflow.SessionsClient({projectId,credentials});

exports.sendToDialogflow = async (message, userId) => {
  const sessionPath = sessionClient.sessionPath(projectId, sessionId + userId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: { text: message, languageCode: 'en' }
    }
  };
  try {
    const responses = await sessionClient.detectIntent(request);
    return responses[0].queryResult.fulfillmentText;
  } catch (error) {
    console.error('Error sending message to Dialogflow:', error);
    return 'An error occurred while processing your request.';
  }
};