module.exports.config = { usePrefix: true,
	name: "onbot",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "SAKIBIN",
	description: "turn the bot on",
	commandCategory: "Admin",
	cooldowns: 0
        };
module.exports.run = ({event, api}) => {
  const permission = global.config.SAKIBIN;
  	if (!permission.includes(event.senderID)) return api.sendMessage("[ ERR ] You don't have permission to use this command", event.threadID, event.messageID);
  api.sendMessage(`[ OK ] ${global.config.BOTNAME} Bot has turned on successfully!`,event.threadID, () =>process.enter(0))
}