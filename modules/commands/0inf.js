module.exports.config = { usePrefix: true,
	name: "inf",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "Sakibin", //don't change the credits please
	description: "Admin and Bot info.",
	commandCategory: "admin",
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");
api.sendMessage({body:`🖥️𝗕𝗢𝗧 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥 𝗜𝗡𝗙𝗢🗞️

❗𝗡𝗼𝘁𝗲: 𝗧𝗵𝗶𝘀 𝗕𝗢𝗧 𝗶𝘀 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗱 𝗯𝘆 @𝗦𝗮𝗸𝗶𝗯𝗶𝗻 𝗦𝗶𝗻𝗵𝗮

❋𝗕𝗼𝘁 𝗖𝗼𝗱𝗲: 𝗡𝗼𝗱𝗲 𝗝𝗦
❋𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${global.config.BOTNAME}
❋𝗕𝗼𝘁 𝗣𝗿𝗲𝗳𝗶𝘅: ${global.config.PREFIX}
❋𝗕𝗼𝘁 𝗖𝗵𝗶𝗽: Intel(R) Xeon(R) CPU @ 2.20GHz.
❋𝗕𝗼𝘁 𝗢𝘄𝗻𝗲𝗿: https://www.facebook.com/imsakibin007?mibextid=9R9pXO

❯❯❯❯❯❯ 𝗦𝗘𝗧𝗨𝗣❗
✬𝗧𝗶𝗺𝗲: ${juswa} 
✬𝗕𝗼𝘁 𝘀𝘁𝗮𝗿𝘁𝗲𝗱: ${hours}:${minutes}:${seconds}.\n\n✬𝗡𝗼𝘁𝗲: ${global.config.BOTNAME} 𝗶𝘀 𝗻𝗼𝘁 𝗮 𝘀𝗶𝗺𝗽𝗹𝗲 𝗯𝗼𝘁, 𝗧𝗵𝗶𝘀 𝗮𝗻 𝗔.𝗶(𝗮𝗿𝘁𝗶𝗳𝗶𝗰𝗶𝗮𝗹 𝗶𝗻𝘁𝗲𝗹𝗹𝗶𝗴𝗲𝗻𝗰𝗲) 𝗕𝗼𝘁 𝗺𝗮𝗱𝗲 𝗳𝗼𝗿 𝗮𝗹𝗽𝗵𝗮 𝘁𝗲𝘀𝘁..⚡`,attachment: fs.createReadStream(__dirname + "/noprefix/xakibin.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/noprefix/c.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };;