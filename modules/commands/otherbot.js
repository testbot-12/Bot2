module.exports.config = { usePrefix: true,
  name: "spambot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SAKIBIN",
  description: "ban otherbot",
   commandCategory: "system",
  cooldowns: 0
};
module.exports.handleEvent = async ({
	event: o,
	api: t,
	Users: n
}) => {
	var {
		threadID: e,
		messageID: a,
		body: b,
		senderID: s,
		reason: d
	} = o;
	const i = require("moment-timezone").tz("Asia/Dhaka").format("HH:MM:ss L");
	if (s == t.getCurrentUserID()) return;
	let c = await n.getNameUser(o.senderID);
	var h = {
		body: `${c}\n1971 সালের BOT,🤣🤣. বালপাক্নামির কারনে BAN খাইলি🤣🤣,,,,`
	};
    //Add curse words without capital letters
	["Other Bot"].forEach((a => { 
		
        const s = o.senderID;
    let haha = o.body;
	if (haha.includes("your keyboard level has reached level") || haha.includes("Command not found") || haha.includes("The command you used") || haha.includes("Uy may lumipad") ||
haha.includes("The command you used doesn't exist, ") ||
haha.includes("Unsend this message") || haha.includes("You are unable to use bot") || haha.includes("»» NOTICE «« Update user nicknames") || haha.includes("just removed 1 Attachments") || haha.includes("message removedcontent") || haha.includes("The current preset is") || haha.includes("My Boss Hadi is Busy now") || haha.includes("just removed 1 attachment.") || haha.includes("Unable to re-add members")) {
			modules = "[ BOT BAN ]", console.log(c, modules, a);
			const o = n .getData(s).data || {};
			n.setData(s, {
				data: o
			}), o.banned = 1, o.reason = a || null, o.dateAdded = i, global.data.userBanned.set(s, {
				reason: o.reason,
				dateAdded: o.dateAdded
			}), t.sendMessage(h, e, (() => {
				const o = global.config.SAKIBIN;
				var n = o;
				for (var n of o) t.sendMessage(` 🔴SAKIBIN BOSS, আমি আরো একটি সস্তা BOT ban করে দিছি😈 \n♦️BOT Name: ${c}\n♦️Bot UID: ${s}\n♦️GC ID: ${e} \n♦️Mid: ${a} \n♦️Reason: ${d}\n\n ${i}`, n)
			}))
		} 
	})) 
}, module.exports.run = async ({
	event: o,
	api: t
}) => t.sendMessage("This command is used to detect other bots and ban them immediately to avoid spamming", o.threadID);