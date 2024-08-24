const axios = require('axios');

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
    console.error("Error converting image to text:", error);
    return null;
  }
}

module.exports.handleEvent = async function ({ api, event }) {
  if (!["sanju", "Sanju", "bot", "Bot", "meta", "Meta", "Ai", "ai"].some(prefix => event.body.startsWith(prefix))) return;

  const { threadID, messageID, type, messageReply, body } = event;
  let question = '';
  let hasImage = false;
  let userName = '';

  if (type === 'message_reply' && messageReply?.attachments[0]?.type === 'photo') {
    hasImage = true;
    const imageURL = messageReply.attachments[0].url;
    question = await convertImageToText(imageURL);
    userName = await Users.getNameUser(event.senderID);

    if (!question) {
      api.sendMessage('❗ Unable to convert the photo, please ensure your image has clear text before sending.', threadID, messageID);
      return;
    }
  } else {
    question = body.slice(5).trim();
    userName = await Users.getNameUser(event.senderID);  // Get userName even if no image
  }

  if (!question) {
    const responses = [
      "এত ডাকাডাকি করো কেনো", 
      "তুমারে রাইতে ভালোবাসি🥺", 
      "I Love You Baby😘", 
      "BOT is made by Sakibin!", 
      "হ্যা বলো জান শুনতেচি☺️",
      "Ki hoise jaan😒", 
      "/call can add admin!", 
      "Jaaan tumi onek cute🫣", 
      "Ask amr mon vlo nei🥲", 
      "Hmm jan ummah😘😘", 
      "/report can nok owner!", 
      "Ato dako kno lojja lage to..", 
      "How can I assist you today!", 
      "/help to see helplist!"
    ];
    const randReply = responses[Math.floor(Math.random() * responses.length)];
    api.sendMessage(`${userName}, ${randReply}`, threadID, messageID);
    return;
  }

  try {
    const response = await axios.get(`https://gpt-19zs.onrender.com/gpt4?prompt=${encodeURIComponent(question)}`);
    const reply = response.data.message;

    if (reply) {
      api.sendMessage(reply, threadID);
    } else {
      api.sendMessage("GPT-4 couldn't provide a response to your query.", threadID);
    }
  } catch (error) {
    console.error("Error fetching GPT-4 response:", error);
    api.sendMessage("Error: API Expired🥲", threadID);
  }
};

module.exports.run = async function ({ api, event }) {};
