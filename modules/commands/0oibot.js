const fs = require("fs");
module.exports.config = { usePrefix: true,
  name: "goibot52",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Mod by John Lester",
  description: "ai",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/dhaka").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["এত ডাকাডাকি করো কেনো", "তুমারে রাইতে ভালোবাসি🥺", "I Love You Baby😘", "BOT is made by Sakibin!", "হ্যা বলো জান শুনতেচি☺️","Ki hoise jaan😒", "/call can add admin!", "Jaaan tumi onek cute🫣","Ask amr mon vlo nei🥲","Hmm jan ummah😘😘","/report can nok owner!","Ato dako kno lojja lage to..","How can I assist you today!","/help to see helplist!"];
  var rand = tl[Math.floor(Math.random() * tl.length)]
  
 if (event.body.indexOf("bot") == 0 ||

(event.body.indexOf("Robot") == 0) ||
(event.body.indexOf("বত") == 0) ||
(event.body.indexOf("বট") == 0) ||
(event.body.indexOf("Bot") == 0)) {
    var msg = {
      body: `╭────────⭓\n│👻 ${name}\n│💌 ${rand}\n╰───────────➣`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

if (event.body.indexOf("bby") == 0 ||
(event.body.indexOf("Bby") == 0) ||    
(event.body.indexOf("Baby") == 0) ||    
(event.body.indexOf("baby") == 0)) {
    var msg = {
      body: "",attachment: fs.createReadStream(__dirname + `/noprefix/yemete.mp3`)
			}
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
