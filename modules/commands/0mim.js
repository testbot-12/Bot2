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
  if (!(event.body.startsWith("sanju") || event.body.startsWith("Sanju") || event.body.startsWith("bot") || event.body.startsWith("Bot") || event.body.startsWith("meta") || event.body.startsWith("Meta") || event.body.startsWith("Ai") || event.body.startsWith("ai"))) return;

  const { threadID, messageID, type, messageReply, body } = event;

  let question = '';
  let hasImage = false;

  if (type === 'message_reply') {
    if (messageReply?.attachments[0]?.type === 'photo') {
      hasImage = true;
      const attachment = messageReply.attachments[0];
      const imageURL = attachment.url;
      question = await convertImageToText(imageURL);

      const userName = await Users.getNameUser(event.senderID);

  const tl = ["এত ডাকাডাকি করো কেনো", "তুমারে রাইতে ভালোবাসি🥺", "I Love You Baby😘", "BOT is made by Sakibin!", "হ্যা বলো জান শুনতেচি☺️","Ki hoise jaan😒", "/call can add admin!", "Jaaan tumi onek cute🫣","Ask amr mon vlo nei🥲","Hmm jan ummah😘😘","/report can nok owner!","Ato dako kno lojja lage to..","How can I assist you today!","/help to see helplist!"];
  var randrepl = tl[Math.floor(Math.random() * tl.length)]


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
    api.sendMessage("${userName}, ${randrepl}", event.threadID);
    return;
  }

  try {

    //api.sendTypingIndicator(event.threadID);
 
    const UID = event.senderID;
    const response = await axios.get(`https://gpt-19zs.onrender.com/gpt4?prompt=${encodeURIComponent(question)}`);
    const reply = response.message;

    if (reply) {
      api.sendMessage(reply, event.threadID);
    } else {
      api.sendMessage("GPT-4 couldn't provide a response to your query.", event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("Error: API Expired🥲", event.threadID);
  }
};

module.exports.run = async function ({ api, event }) {};

