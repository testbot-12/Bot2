module.exports.config = { usePrefix: true,
	name: "help?",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "sakibin",
	description: "Bot operator information",
	commandCategory: "info",
	cooldowns: 3
};

module.exports.run = ({ event, api }) => api.sendMessage(`➤ 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 LIST
 ━━━━━━━━━━━━
 ||      S A K B I N      ||
 ━━━━━━━━━━━━
 🈹Total commands: 617
 🈺Available page: 14
📂NSF 
📂PRANK 
📂ANIME 
📂EDIT
📂MIDEA
🪄ISLAMIC
🖥️Linux
🤖A.i
🟥 সব CMD দেখার জন্য /help 1 লিখুন!
🟥 প্রতি page এ 15 টি CMD থাকবে,
🟦 যেকোনো পেজ এর CMD দেখতে👇
👉/help [page No.?] দিবেন!

🪄Help Modules by SAKIBIN✨
╭────────────⭓
│ 𝐍𝐨𝐭𝐞: 𝐓𝐡𝐚𝐧𝐤𝐬 𝐃𝐞𝐚𝐫 𝐔𝐬𝐞𝐫  🌺
╰────────────────✢`, event.threadID, event.messageID);