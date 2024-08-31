const { gpt } = require("nayan-server");

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

module.exports.handleEvent = async function ({ api, event, args, Threads, Users }) {
  if (!(event.body.startsWith("sanju") || event.body.startsWith("Sanju") ||  event.body.startsWith("meta") || event.body.startsWith("Meta") || event.body.startsWith("gpt4") || event.body.startsWith("Gpt4"))) return;

  const { threadID, messageID, type, messageReply, body } = event;
  const userName = await Users.getNameUser(event.senderID);

  const tl = ["এত ডাকাডাকি করো কেনো", "তুমারে রাইতে ভালোবাসি🥺", "I Love You Baby😘", "BOT is made by Sakibin!", "হ্যা বলো জান শুনতেচি☺️","Ki hoise jaan😒", "/call can add admin!", "Jaaan tumi onek cute🫣","Ask amr mon vlo nei🥲","Hmm jan ummah😘😘","/report can nok owner!","Ato dako kno lojja lage to..","How can I assist you today!","/help to see helplist!"];
  var randrepl = tl[Math.floor(Math.random() * tl.length)];

  let question = '';
  let hasImage = false;

  if (type === 'message_reply') {
    if (messageReply?.attachments[0]?.type === 'photo') {
      hasImage = true;
      // Skipping image processing since no axios
      api.sendMessage('❗ Image processing is currently unavailable.', threadID, messageID);
      return;
    } else {
      question = messageReply?.body?.trim() || '';
    }
  } else { 
    question = body.slice(5).trim();
  }

  if (!question) {
    api.sendMessage(`${userName}, ${randrepl}`, event.threadID);
    return;
  }

  try {
    gpt({
      messages: [
{
            role: "assistant",
            content: "Hello! How are you today?"
        },
        {
          role: "user",
          content: "Sakibin is Programmer from Bangladesh, He completed programming language like html, css, bootstrap, node js, bash. Find him into facebook: https://fb.me/imsakibin007"
        }
      ],
      prompt: question,
      model: "GPT-4",
      markdown: false
    }, (err, data) => {
      if (err) {
        console.error(err);
        api.sendMessage("Error: Unable to process your request.", event.threadID);
      } else {
        const reply = data.gpt || "GPT-4 couldn't provide a response to your query.";
        api.sendMessage(reply, event.threadID);
      }
    });
  } catch (error) {
    console.error(error);
    api.sendMessage("Error: API Expired🥲", event.threadID);
  }
};

module.exports.run = async function ({ api, event }) {};
