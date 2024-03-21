module.exports.config = { usePrefix: true,
	name: "\n",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "MrTomXxX",
	description: "Automatically On Prefix",
	commandCategory: "Tools",
	usages: "Tools",
	cooldowns: 0
};

module.exports.run = async ({ api, event }) => {
  const allicon = ["💞","💖","💗","💜","🌸","💗","💝","🎀","🌹","🍁","🎊","🌟","🍁"];
  const time = process.uptime() + global.config.UPTIME,
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
  var z_1 = (hours < 10) ? '0' + hours : hours;
    var x_1 = (minutes < 10) ? '0' + minutes : minutes;
    var y_1 = (seconds < 10) ? '0' + seconds : seconds;
const icon = allicon[Math.floor(Math.random()*allicon.length)];
const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    const moment = require("moment-timezone");
  const timeNow = moment.tz("Asia/Dhaka").format("DD/MM/YYYY || HH:mm:ss");
   var thu = moment.tz('Asia/Dhaka').format('dddd');
  if (thu == 'Sunday') thu = '𝙎𝙪𝙣𝙙𝙖𝙮'
  if (thu == 'Monday') thu = '𝙈𝙤𝙣𝙙𝙖𝙮'
  if (thu == 'Tuesday') thu = '𝙏𝙪𝙚𝙨𝙙𝙖𝙮'
  if (thu == 'Wednesday') thu = '𝙒𝙚𝙙𝙣𝙚𝙨𝙙𝙖𝙮'
  if (thu == "Thursday") thu = '𝙏𝙝𝙪𝙧𝙨𝙙𝙖𝙮'
  if (thu == 'Friday') thu = '𝙅𝙪𝙢𝙢𝙖 𝙈𝙪𝙗𝙖𝙧𝙖𝙠'
  if (thu == 'Saturday') thu = '𝙎𝙖𝙩𝙪𝙧𝙙𝙖𝙮'
  const namebot = config.BOTNAME
  const res = await axios.get(`https://jrt-api.jrtxtracy.repl.co/love`);
var thinh = res.data.data
					api.sendMessage({
                                                body: ` === 『 ${namebot} 』 ===\n◆━━━━━━━━━━━━◆\n⏰ 𝐓𝐢𝐦𝐞: ${timeNow}\n⏳ 𝐁𝐎𝐓 𝐨𝐧𝐥𝐢𝐧𝐞: ${hours} : ${minutes} : ${seconds}\n🕐 𝐇𝐨̂𝐦 𝐧𝐚𝐲 𝐥𝐚̀: ${thu}\n━━━━━『${icon}』━━━━━ \n${thinh}\n\n💮 𝐓𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 "❤️" 𝐯𝐚̀𝐨 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐜𝐮̉𝐚 𝐛𝐨𝐭 đ𝐞̂̉ xem help`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://sex.trunghieuvn.repl.co/video/gai')).data.data,
method: "GET",
responseType: "stream"
})).data
},event.threadID, (err, info) => {
    global.client.handleReaction.push({
      name: this.config.name, 
      messageID: info.messageID,
      author: event.senderID,
    })
    },event.messageID);
     }
module.exports.handleReaction = async ({ event, api, handleReaction, Currencies, Users}) => {
const axios = global.nodemodule["axios"];
const fs = global.nodemodule["fs-extra"];
const { threadID, messageID, userID } = event;
if (event.userID != handleReaction.author) return;
if (event.reaction != "❤") return; 
 api.unsendMessage(handleReaction.messageID);
        var msg = `===『 𝐋𝐄̣̂𝐍𝐇 𝐃𝐔̀𝐍𝐆 』===
◆━━━━━━━━━━━━━◆
${global.config.PREFIX}𝐡𝐞𝐥𝐩 => 𝐗𝐞𝐦 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐜𝐚́𝐜 𝐥𝐞̣̂𝐧𝐡 𝐭𝐫𝐞̂𝐧 𝐛𝐨𝐭
${global.config.PREFIX}𝐦𝐞𝐧𝐮 => 𝐗𝐞𝐦 𝐜𝐚́𝐜 𝐦𝐞𝐧𝐮 đ𝐚̃ 𝐩𝐡𝐚̂𝐧 𝐜𝐡𝐢𝐚 𝐭𝐫𝐞̂𝐧 𝐛𝐨𝐭
${global.config.PREFIX}𝐜𝐡𝐞𝐜𝐤𝐭𝐭 => 𝐗𝐞𝐦 𝐭𝐮̛𝐨̛𝐧𝐠 𝐭𝐚́𝐜 𝐜𝐚́𝐜 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 
${global.config.PREFIX}𝐜𝐡𝐞𝐜𝐤𝐭𝐭𝟐 => 𝐗𝐞𝐦 𝐭𝐨̂̉𝐧𝐠 𝐭𝐮̛𝐨̛𝐧𝐠 𝐭𝐚́𝐜 𝐜𝐚́𝐜 𝐛𝐨𝐱 𝐝𝐨̂̀𝐧 𝐥𝐚̣𝐢
${global.config.PREFIX}𝐜𝐡𝐞𝐜𝐤𝐫𝐚𝐧𝐤 => 𝐗𝐞𝐦 𝐜𝐡𝐢̉ 𝐬𝐨̂́ 𝐱𝐞̂́𝐩 𝐡𝐚̣𝐧𝐠 𝐫𝐚𝐧𝐤 𝐭𝐮̛𝐨̛𝐧𝐠 𝐭𝐚́𝐜
${global.config.PREFIX}𝐛𝐨𝐱 𝐢𝐧𝐟𝐨 => Đ𝐞̂̉ 𝐱𝐞𝐦 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐯𝐞̂̀ 𝐛𝐨𝐱
${global.config.PREFIX}𝐢𝐧𝟒 => 𝐗𝐞𝐦 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠
${global.config.PREFIX}𝐥𝐨̣𝐜 => 𝐋𝐨̣𝐜 𝐜𝐚́𝐜 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐮̛𝐨̛𝐧𝐠 𝐭𝐚́𝐜 = 𝟎 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧
${global.config.PREFIX}𝐥𝐨𝐜𝐦𝐞𝐦 => 𝐋𝐨̣𝐜 𝐜𝐚́𝐜 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐮̛𝐨̛𝐧𝐠 𝐭𝐚́𝐜 = 𝟎 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 (𝐝𝐮̛̣ 𝐩𝐡𝐨̀𝐧𝐠)
${global.config.PREFIX}𝐠𝐡𝐞́𝐩 => 𝐆𝐡𝐞́𝐩 đ𝐨̂𝐢 𝐯𝐨̛́𝐢 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐧𝐠𝐚̂̃𝐮 𝐧𝐡𝐢𝐞̂𝐧
${global.config.PREFIX}𝐠𝐡𝐞𝐩𝐥𝐨𝐯𝐞 => 𝐆𝐡𝐞́𝐩 đ𝐨̂𝐢 đ𝐮̛𝐨̛̣𝐜 𝐜𝐡𝐨̣𝐧 𝐧𝐚𝐦/𝐧𝐮̛̃ 𝐧𝐠𝐚̂̃𝐮 𝐧𝐡𝐢𝐞̂𝐧
${global.config.PREFIX}𝐬𝐞𝐭𝐧𝐚𝐦𝐞 𝐨𝐫 ${global.config.PREFIX}𝐧𝐚𝐦𝐞 => 𝐓𝐡𝐚𝐲 đ𝐨̂̉𝐢 𝐛𝐢𝐞̣̂𝐭 𝐝𝐚𝐧𝐡 𝐜𝐮̉𝐚 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧
${global.config.PREFIX}𝐢𝐦𝐠𝐮𝐫 => 𝐋𝐚̂́𝐲 𝐥𝐢𝐧𝐤 𝐚̉𝐧𝐡 𝐢𝐦𝐠𝐮𝐫
${global.config.PREFIX}𝐬𝐢𝐧𝐠 => 𝐍𝐠𝐡𝐞 𝐧𝐡𝐚̣𝐜 𝐘𝐨𝐮𝐭𝐮𝐛𝐞 𝐭𝐫𝐞̂𝐧 𝐛𝐨𝐭
${global.config.PREFIX}𝐯𝐢𝐝𝐞𝐨 => 𝐗𝐞𝐦 𝐯𝐢𝐝𝐞𝐨 𝐘𝐨𝐮𝐭𝐮𝐛𝐞 𝐭𝐫𝐞̂𝐧 𝐛𝐨𝐭
${global.config.PREFIX}𝐲𝐭𝐛 => 𝐑𝐞𝐩𝐥𝐲 𝐯𝐢𝐝𝐞𝐨/𝐦𝐮𝐬𝐢𝐜 𝐘𝐨𝐮𝐭𝐮𝐛𝐞 𝐭𝐮̀𝐲 𝐜𝐡𝐨̣𝐧 𝐭𝐫𝐞̂𝐧 𝐛𝐨𝐭
[☁️]➜ 𝗟𝘂̛𝘂 𝘆́ 𝗽𝗵𝗮̉𝗶 𝘃𝗶𝗲̂́𝘁 đ𝘂́𝗻𝗴 𝗰𝗵𝗶́𝗻𝗵 𝘁𝗮̉ 
━━━━━━━━━━━━━
🌸 ===『 𝐁𝐨𝐭 𝐇𝐨𝐚̀𝐧𝐠 𝐓𝐡𝐚𝐧𝐡 𝐓𝐮𝐚̂́𝐧 』=== 🌸   https://www.facebook.com/duong.than.net`
        return api.sendMessage({body: msg, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://sex.trunghieuvn.repl.co/video/gai')).data.data,
method: "GET",
responseType: "stream"
})).data
},event.threadID); 
}