module.exports.config = { usePrefix: true,
	name: "restart",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "SAKIBIN",
	description: "Restart Bot",
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`╭───────♻️\n│${global.config.BOTNAME} is \n│🔄RESTARTING...\n│▄▄▄▄▄▄▄▄▄▄\n│么System RESTART Successful☑\n│么Processing time: 4s\n│▄▄▄▄▄▄▄▄▄▄\n│🅱🅾🆃 by SAKIBIN✿❀✯\n╰───────────⧕`, threadID, () => process.exit(1));
}