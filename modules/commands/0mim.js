const axios = require('axios');
const fs = require('fs');
const gtts = require('gtts');

module.exports.config = {
  name: "gpt5",
  version: "2.1.3",
  hasPermission: 0,
  credits: "sakibin",
  description: "",
  commandCategory: "ai",
  usages: "( Model-v3 Demo GPT-4 )",
  cooldowns: 3,
};

async function convertImageToText(imageURL) {
  try {
    const response = await axios.get(`https://hazeyy-api-img2text.kyrinwu.repl.co/api/recognition/image2text?input=${encodeURIComponent(imageURL)}`);
    return response.data.extractedText;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.startsWith("gpt") || event.body.startsWith("Gpt") || event.body.startsWith("ai") || event.body.startsWith("soha") || event.body.startsWith("Ai"))) return;

  const { threadID, messageID, type, messageReply, body } = event;

  let question = '';
  let hasImage = false;

  if (type === 'message_reply') {
    if (messageReply?.attachments[0]?.type === 'photo') {
      hasImage = true;
      const attachment = messageReply.attachments[0];
      const imageURL = attachment.url;
      question = await convertImageToText(imageURL);

      if (!question) {
        api.sendMessage('❗ Unable to convert the photo, please ensure your image has clear text before sending.', threadID, messageID);
        return;
      }
    } else {
      question = messageReply?.body?.trim() || '';
    }
  } else { 
    question = body.slice(5).trim();
  }

  if (!question) {
    api.sendMessage("Hello👋, I am Model-v3 Demo GPT-4, designed and remodeled by Sakibin.\n\nHow can I assist you today?", event.threadID);
    return;
  }

  try {
    api.sendTypingIndicator(event.threadID); 
    const UID = event.senderID;
    const response = await axios.get(`https://markdevs-api.onrender.com/gpt4?uid=${UID}&prompt=${encodeURIComponent(question)}`);
    const reply = response.data.gpt4;

    if (reply) {
      api.sendMessage(reply, event.threadID);
    } else {
      api.sendMessage("🤖 Demo GPT-4 couldn't provide a response to your query.", event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("🔴 An error occurred. Please try again later.", event.threadID);
  }
};

module.exports.run = async function ({ api, event }) {};
